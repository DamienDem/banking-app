declare type Account = {
  id: string;
  balance: number;
  name: string;
};

declare type User = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
};

declare interface DoughnutChartProps {
  accounts: Account[];
}
declare interface HeaderPropsBox {
  type?: "title" | "welcome";
  title: string;
  subtext?: string;
  userName?: string;
}

declare interface TotalBalanceBoxProps {
  accounts: Account[];
  totalBanks: number;
  totalBalance: number;
}
