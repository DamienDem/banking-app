import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("HomePage");
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="welcome"
            title={t("welcome")}
            userName="Jhon"
            subtext={t("accesAndManage")}
          />
          <TotalBalanceBox accounts={[]} totalBanks={2} totalBalance={1300} />
        </header>
      </div>
      <RightSidebar />
    </section>
  );
};

export default Home;
