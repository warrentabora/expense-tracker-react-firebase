import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransaction } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { auth } from "../../config/firebase-config";


export const ExpenseTracker = () => {
    const transactionActions = useAddTransaction();
    const { addTransaction, deleteTransaction } = transactionActions;
    const { transactions, transactionTotals } = useGetTransaction();
    const { name, profilePhoto } = useGetUserInfo();
    const navigate = useNavigate();

    const { balance, income, expense } = transactionTotals;



    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(null);
    const [transactionType, setTransactionType] = useState("expense");



    const submitNewTransaction = (e) => {
        e.preventDefault();
        try {
            addTransaction({
                description,
                transactionAmount,
                transactionType
            })
        } catch (err) {
            console.error(err);
        }

        setDescription("")
        setTransactionAmount("")
    };

    const signOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };




    return (
        <>
            <div className="expense-tracker">
                <h2 className="title">{name}'s Expense Tracker</h2>
                {profilePhoto?.trim() && (
                    <div className="profile">
                        <img src={profilePhoto} alt="Profile" className="profile-pic" />
                    </div>
                )}
                <div className="summary">
                    <p className="balance">Balance: {balance < 0 ? <span> -P{balance * -1}</span> : <span>  P{balance}</span>}</p>
                    <p className="total-income">Total Income: {income}</p>
                    <p className="total-expense">Total Expenses: {expense}</p>
                </div>
                <button onClick={signOut} className="sign-out-button">Sign-out</button>
                <form className="form-container" onSubmit={submitNewTransaction}>
                    <div className="input-group">
                        <input type="text" placeholder="Description" value={description} className="input" onChange={((e) => setDescription(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <input type="number" placeholder="Amount" value={transactionAmount} className="input" onChange={((e) => setTransactionAmount(e.target.value))} />
                    </div>
                    <div className="checkbox-group">
                        <label>
                            <input type="checkbox" className="checkbox" name="type" value="income" checked={transactionType === "income"}
                                onChange={((e) => setTransactionType(e.target.value))} />
                            Income
                        </label>
                        <label>
                            <input type="checkbox" className="checkbox" name="type" value="expense" checked={transactionType === "expense"}
                                onChange={((e) => setTransactionType(e.target.value))} />
                            Expense
                        </label>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="submit-button">Add Transaction</button>
                    </div>
                </form>
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => {
                            const { description, transactionAmount, transactionType, id } = transaction;
                            return (
                                <tr key={index}>
                                    <td>{description}</td>
                                    <td style={{ color: transactionType === "expense" ? "red" : "green" }}>{transactionAmount}</td>
                                    <td>{transactionType}</td>
                                    <td>
                                        <button
                                            className="delete-button"
                                            onClick={() => deleteTransaction(id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </div >
        </>
    );

};