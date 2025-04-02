import { useState, useEffect } from "react";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";


export const useGetTransaction = () => {

    const [transactions, setTransactions] = useState([]);
    const [transactionTotals, setTransactionTotals] = useState({ balanc: 0, expense: 0, income: 0 })
    const transactionCollectionRef = collection(db, "transactions");
    const { userId } = useGetUserInfo();

    const getTransactions = async () => {
        let unsubscribe;
        try {
            const queryTransactions = query(transactionCollectionRef, where("userId", "==", userId), orderBy("createdAt"));


            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {

                let docs = [];
                let totalIncoome = 0;
                let totalExpense = 0;

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({ ...data, id });
                    if (data.transactionType === "expense") {
                        totalExpense += Number(data.transactionAmount);
                    } else {
                        totalIncoome += Number(data.transactionAmount);
                    }
                });
                let balance = totalIncoome - totalExpense;
                setTransactions(docs);
                setTransactionTotals(
                    {
                        balance,
                        expense: totalExpense,
                        income: totalIncoome
                    }
                )
            });

        } catch (err) {
            console.error(err);
        }
        return () => unsubscribe();
    }

    useEffect(() => {
        getTransactions();
    }, []);

    return { transactions, transactionTotals };
}