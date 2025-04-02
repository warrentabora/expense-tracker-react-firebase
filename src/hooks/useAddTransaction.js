import { db } from "../config/firebase-config";
import { addDoc, collection, serverTimestamp, doc, deleteDoc } from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
    const transactionCollectionRef = collection(db, "transactions");
    const { userId } = useGetUserInfo();

    const addTransaction = async ({ description, transactionAmount, transactionType }) => {
        try {
            await addDoc(transactionCollectionRef, {
                userId,  // Make sure userId is included
                description,
                transactionAmount: Number(transactionAmount), // Ensure it's a number
                transactionType,
                createdAt: serverTimestamp(),
            });
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };

    const deleteTransaction = async (transactionId) => {
        try {
            await deleteDoc(doc(db, "transactions", transactionId));
            console.log("Transaction deleted!");
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    return { addTransaction, deleteTransaction };
};
