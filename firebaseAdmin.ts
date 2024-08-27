import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}"
);
const firebaseAdminConfig = {
  credential: cert(serviceAccount),
};

if (getApps().length <= 0) {
  initializeApp(firebaseAdminConfig);
}

export const adminAuth = getAuth();
