import HeaderBox from "@/components/HeaderBox";
import { Pagination } from "@/components/Pagination";
import TransactionsHeader from "@/components/TransactionsHeader";
import TransactionsTable from "@/components/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";
import React from "react";

const TransactionHistory = async ({
  searchParams: { id, page },
}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const user = await getCurrentUser();

  if (user === null) return;
  const accounts = await getAccounts({ userId: user.uid });

  if (!accounts) return;

  const accountsData = accounts?.data;
  const bankItemId = (id as string) || accountsData[0]?.bankId;

  const { data: account, transactions: transactions } = await getAccount({
    bankId: bankItemId,
  });

  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  return (
    <div className="transactions">
      <TransactionsHeader account={account} />

      <section className="flex w-full flex-col gap-6">
        <TransactionsTable transactions={currentTransactions} />
        {totalPages > 1 && (
          <div className="my-4 w-full">
            <Pagination totalPages={totalPages} page={currentPage} />
          </div>
        )}
      </section>
    </div>
  );
};

export default TransactionHistory;
