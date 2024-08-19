import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { useTranslations } from "next-intl";

const Home = ({
  user,
  accounts,
  totalBanks,
  totalBalance,
}: HomeContentProps) => {
  const t = useTranslations("HomePage");

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
      </div>
      <RightSidebar user={user} banks={accounts?.slice(0, 2)} />
    </section>
  );
};

export default Home;
