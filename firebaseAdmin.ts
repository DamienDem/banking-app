import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseAdminConfig = {
  credential: cert("./service-account-file.json"),
};

if (getApps().length <= 0) {
  initializeApp(firebaseAdminConfig);
}

export const adminAuth = getAuth();
