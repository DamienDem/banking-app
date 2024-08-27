import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TransactionsTable from './TransactionsTable'
import { Pagination } from './Pagination'
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import { useTranslations } from 'next-intl'

const RecentTransactions = ({
  accounts,
  transactions = [],
  id,
  page = 1,
}: TransactionsProps) => {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const t = useTranslations("RecentTransactions");

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions.slice(
    indexOfFirstTransaction, indexOfLastTransaction
  )

  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">{t('recentTransactions')}</h2>
        <Link
          href={`/transaction-history/?id=${id}`}
          className="view-all-btn"
        >
          {t('viewAll')}
        </Link>
      </header>

      <Tabs defaultValue={id} className="w-full">
      <TabsList className="recent-transactions-tablist">
          {accounts.map((account: Account) => (
            <TabsTrigger key={account.id} value={account.id}>
              <BankTabItem
                key={account.id}
                account={account}
                id={id}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {accounts.map((account: Account) => (
          <TabsContent
            value={account.id}
            key={account.id}
            className="space-y-4"
          >
            <BankInfo 
              account={account}
              id={id}
              type="full"
            />

            <TransactionsTable transactions={currentTransactions} />
            

            {totalPages > 1 && (
              <div className="my-4 w-full">
                <Pagination totalPages={totalPages} page={page} />
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

export default RecentTransactions