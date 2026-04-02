import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { transactions as initialTransactions } from "@/utils/mockData";

export interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (data: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: number) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [list, setList] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem("qix_transactions");
    return stored ? JSON.parse(stored) : initialTransactions;
  });

  useEffect(() => {
    localStorage.setItem("qix_transactions", JSON.stringify(list));
  }, [list]);

  const addTransaction = useCallback((data: Omit<Transaction, "id">) => {
    const newTx: Transaction = {
      ...data,
      id: Math.max(0, ...list.map(t => t.id)) + 1
    };
    setList(prev => [newTx, ...prev]);
  }, [list]);

  const deleteTransaction = useCallback((id: number) => {
    setList(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions: list, addTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be used within TransactionProvider");
  return ctx;
};
