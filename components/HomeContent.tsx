import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { useTranslations } from "next-intl";

import RecentTransactions from "./Transactions";

const HomeContent = ({
  user,
  accounts,
  account,
  totalBanks,
  totalBalance,
  page,
  id,
}: HomeContentProps) => {
  const t = useTranslations("HomePage");
  const currentPage = Number(page) || 1;

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="welcome"
            title={t("welcome")}
            userName={user.firstName}
            subtext={t("accesAndManage")}
          />
          <TotalBalanceBox
            accounts={accounts}
            totalBanks={totalBanks}
            totalBalance={totalBalance}
          />
        </header>
        <RecentTransactions
          accounts={accounts}
          transactions={account?.transactions}
          id={id}
          page={currentPage}
        />
      </div>
      <RightSidebar
        user={user}
        transactions={account?.transactions}
        banks={accounts?.slice(0, 2)}
      />
    </section>
  );
};

export default HomeContent;
