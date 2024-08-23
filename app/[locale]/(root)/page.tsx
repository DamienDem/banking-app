import HomeContent from "@/components/HomeContent";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const pageString = page?.toString() || "1";
  const user = await getCurrentUser();

  if (user === null) return;

  const accounts = await getAccounts({ userId: user.uid });

  const accountsData = accounts?.data;

  const bankItemId: string = (id as string) || accountsData[0]?.bankId;

  const account = await getAccount({ bankId: bankItemId });

  if (!accounts) return;

  return (
    <HomeContent
      account={account}
      user={user}
      accounts={accountsData}
      totalBanks={accounts?.totalBanks}
      totalBalance={accounts?.totalCurrentBalance}
      page={pageString}
      id={bankItemId}
    />
  );
};

export default Home;
