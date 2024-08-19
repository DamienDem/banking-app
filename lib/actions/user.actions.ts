"use server";

import { cookies } from "next/headers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import { adminAuth } from "@/firebaseAdmin";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  encryptId,
  extractCustomerIdFromUrl,
  parseStringify,
} from "@/lib/utils";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { plaidClient } from "../plaid";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
import { revalidatePath } from "next/cache";

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const user = (await getDoc(userDocRef)).data();

    return parseStringify(user) as User;
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const idToken = await auth.currentUser!.getIdToken();
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    cookies().set("session", sessionCookie, {
      httpOnly: true,
      secure: true,
      maxAge: expiresIn,
    });

    const user = await getUserInfo({ userId: userCredential.user.uid });
    return parseStringify(user);
  } catch (error) {
    console.error("Error", error);
  }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  try {
    const { email } = userData;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCredential.user;

    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData,
      type: "personal",
      address1: userData.address,
      state: "NY",
      ssn: "1234",
    });

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl!);

    const userDocData = {
      ...userData,
      dwollaCustomerId,
      dwollaCustomerUrl,
    };
    await setDoc(doc(db, "users", uid), userDocData);

    const idToken = await auth.currentUser!.getIdToken();
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });
    cookies().set("session", sessionCookie, { httpOnly: true, secure: true });

    return {
      ...userDocData,
      uid: uid,
    };
  } catch (error) {
    console.error("Error", error);
  }
};

export async function getCurrentUser() {
  const sessionCookie = cookies().get("session");

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(
      sessionCookie.value
    );
    const userDoc = await getDoc(doc(db, "users", decodedClaims.uid));

    return { uid: decodedClaims.uid, ...userDoc.data() } as User;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur actuel:",
      error
    );
    return null;
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
    cookies().delete("session");
    return { success: true };
  } catch (error) {
    return null;
  }
}

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.uid,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.log(error);
  }
};
export const createBankAccount = async (bankData: createBankAccountProps) => {
  try {
    const bankAccount = await setDoc(doc(db, "banks", bankData.accountId), {
      ...bankData,
    });

    return parseStringify(bankAccount);
  } catch (error) {}
};

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    // Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(
      request
    );
    const processorToken = processorTokenResponse.data.processor_token;

    // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    // If the funding source URL is not created, throw an error
    if (!fundingSourceUrl) throw Error;

    // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and shareableId ID
    await createBankAccount({
      userId: user.uid,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });

    // Revalidate the path to reflect the changes
    revalidatePath("/");

    // Return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.error("An error occurred while creating exchanging token:", error);
  }
};

export const getBanks = async ({ userId }: getBanksProps) => {
  try {
    const banksCollectionRef = collection(db, "banks");
    const q = query(banksCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const banks: Bank[] = [];
    querySnapshot.forEach((doc) => {
      banks.push({ id: doc.id, ...doc.data() } as Bank);
    });
    return parseStringify(banks);
  } catch (error) {
    console.log(error);
  }
};

export const getBank = async ({ documentId }: getBankProps) => {
  try {
    const bankDocRef = await doc(db, "banks", documentId);
    const bank = (await getDoc(bankDocRef)).data();

    return parseStringify(bank);
  } catch (error) {
    console.log(error);
  }
};
