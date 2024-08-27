import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import MyBanksContent from "@/components/MyBanksContent";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import React from "react";

const MyBanks = async () => {
  const user = await getCurrentUser();

  if (user === null) return;
  const { data: accounts } = await getAccounts({ userId: user.uid });
  return <MyBanksContent accounts={accounts} user={user} />;
};

export default MyBanks;
