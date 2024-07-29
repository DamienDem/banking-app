import { formatAmount } from "@/utils";
import { useTranslations } from "next-intl";

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalBalance,
}: TotalBalanceBoxProps) => {
  const t = useTranslations("HomePage");
  return (
    <section className="total-balance">
      <div className="total-balance-chart">Chart</div>
      <div className="flex flex-col gap-6">
        <h2 className="header-2">{t("bankAccount", { count: totalBanks })}</h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">{t("currentBalance")}</p>
          <div className="total-balance-amount flex-center gap-2">
            {formatAmount(totalBalance)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
