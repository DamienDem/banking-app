"use server";

import { cookies } from "next/headers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import { adminAuth } from "@/firebaseAdmin";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { parseStringify } from "@/lib/utils";

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

export const signUp = async (user: User) => {
  try {
    const { email, password, ...userData } = user;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCredential.user;

    await setDoc(doc(db, "users", uid), {
      ...userData,
      email,
    });

    const idToken = await auth.currentUser!.getIdToken();
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });
    cookies().set("session", sessionCookie, { httpOnly: true, secure: true });

    return parseStringify(userCredential.user);
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

    if (userDoc.exists()) {
      return parseStringify(userDoc.data()) as User;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur actuel:", error);
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
