"use server";

import { cookies } from "next/headers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import { adminAuth } from "@/firebaseAdmin";
import { doc, setDoc } from "firebase/firestore";

const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

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
    const user = userCredential.user;

    const customToken = await adminAuth.createCustomToken(user.uid);

    cookies().set("firebase-token", customToken, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(user);
  } catch (error) {
    console.error("Error", error);
  }
};

export const signUp = async ({
  password,
  ...userData
}: {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  adress: string;
  [key: string]: any;
}) => {
  const { email, firstName, lastName } = userData;

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
    
    return user;
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

    const decodedToken = await adminAuth.verifyIdToken(token);
    const user = decodedToken.firebase.identities;

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
