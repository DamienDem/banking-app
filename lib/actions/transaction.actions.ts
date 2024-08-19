"use server";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { parseStringify } from "../utils";
import { db } from "@/firebase";

export const createTransaction = async (
  transaction: CreateTransactionProps
) => {
  try {
    const newTransaction = await setDoc(
      doc(db, "transactions", transaction.userId),
      transaction
    );

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
      where("receiverBankId", "==", bankId),
      where("senderBankId", "==", bankId)
    );

    const querySnapshot = await getDocs(q);

    const documents:Transaction[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() } as Transaction);
    });
    const transactions = {
      total: documents.length,
      documents: documents,
    };
    return parseStringify(transactions);
  } catch (error) {
    console.log(error);
  }
};
