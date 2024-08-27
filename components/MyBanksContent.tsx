import React from "react";
import HeaderBox from "./HeaderBox";
import BankCard from "./BankCard";
import { useTranslations } from "next-intl";

const MyBanksContent = ({
  accounts,
  user,
}: {
  accounts: Account[];
  user: User;
}) => {
  const t = useTranslations("MyBanks");
  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title={t("myBanksAccounts")}
          subtext={t("EffortlesslyManagaeYourBankAccounts")}
        />

        <div className="space-y-4">
          <h2 className="header-2">{t("yourCards")}</h2>
          <div className="flex flex-wrap gap-6">
            {accounts &&
              accounts.map((a: Account) => (
                <BankCard key={a.id} account={a} userName={user?.firstName} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanksContent;
