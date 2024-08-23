"use server";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { parseStringify } from "../utils";
import { db } from "@/firebase";

export const createTransaction = async (
  transaction: CreateTransactionProps
) => {
  try {
    const transactionRef = doc(collection(db, "transactions"));
    const transactionWithId = {
      ...transaction,
      id: transactionRef.id,
      category: "Transfer",
      channel: "online",
      createdAt: new Date().toISOString(),
    };

    await setDoc(transactionRef, transactionWithId);

    const newTransaction = (await getDoc(transactionRef)).data();
    return parseStringify(newTransaction);
  } catch (error) {
    console.log(error);
  }
};

export const getTransactionsByBankId = async ({
  bankId,
}: getTransactionsByBankIdProps) => {
  try {
    const transactionsCollectionRef = collection(db, "transactions");
    const q = query(
      transactionsCollectionRef,
      or(
        where("receiverBankId", "==", bankId),
        where("senderBankId", "==", bankId)
      )
    );

    const querySnapshot = await getDocs(q);

    const documents: Transaction[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() } as Transaction);
    });
    const transactions = {
      total: documents.length,
      documents: documents,
    };

    return transactions;
  } catch (error) {
    console.log(error);
  }
};
