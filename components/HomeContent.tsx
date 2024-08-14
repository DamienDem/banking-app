import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { useTranslations } from "next-intl";

const Home = ({ user }: { user: User }) => {
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
          <TotalBalanceBox accounts={[]} totalBanks={2} totalBalance={1300} />
        </header>
      </div>
      <RightSidebar
        user={user}
        banks={[
          { id: "1", balance: 1300, name: "chase" },
          { id: "2", balance: 800, name: "HSBC" },
        ]}
      />
    </section>
  );
};

export default Home;
