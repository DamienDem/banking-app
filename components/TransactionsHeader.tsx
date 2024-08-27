import { formatAmount } from "@/lib/utils";
import HeaderBox from "./HeaderBox";
import { useTranslations } from "next-intl";

const TransactionsHeader = ({ account }: { account: Account }) => {
  const t = useTranslations("TransactionHistory");
  return (
    <>
      <div className="transactions-header">
        <HeaderBox
          title={t("transactionHistory")}
          subtext={t("seeYourBankDetails")}
        />
      </div>
      <div className="transactions-account">
        <div className="flex flex-col gap-2">
          <h2 className="text-18 font-bold text-white">{account?.name}</h2>
          <p className="text-14 text-blue-25">{account?.officialName}</p>
          <p className="text-14 font-semibold tracking-[1.1px] text-white">
            ●●●● ●●●● ●●●● {account?.mask}
          </p>
        </div>

        <div className="transactions-account-balance">
          <p className="text-14">{t("currentBalance")}</p>
          <p className="text-24 text-center font-bold">
            {formatAmount(account?.currentBalance)}
          </p>
        </div>
      </div>
    </>
  );
};

export default TransactionsHeader;
