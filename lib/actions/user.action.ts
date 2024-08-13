"use server";

import { cookies } from "next/headers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import { adminAuth } from "@/firebaseAdmin";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { parseStringify } from "@/lib/utils";

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const user = await getDoc(userDocRef);

    return parseStringify(user.data());
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

    const customToken = await adminAuth.createCustomToken(
      userCredential.user.uid
    );

    cookies().set("firebase-token", customToken, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: userCredential.user.uid });
    return parseStringify(user);
  } catch (error) {
    console.error("Error", error);
  }
};

export const signUp = async ({
  password,
  ...userData
}: {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  email: string;
  password: string;
}) => {
  "use server";
  const { email } = userData;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      ...userData,
    });

    return parseStringify(user);
  } catch (error) {
    console.error("Error", error);
  }
};

export async function getLoggedInUser() {
  try {
    const token = cookies().get("firebase-token")?.value;
    if (!token) {
      throw new Error("No token found");
    }
    const userId = (await adminAuth.verifyIdToken(token)).uid;

    const user = getUserInfo({ userId: userId });

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    cookies().delete("firebase-token");
    // Note: Firebase doesn't have a server-side logout.
    // Client-side logout should be handled separately.
  } catch (error) {
    return null;
  }
};
