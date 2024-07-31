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

declare interface CreditCardProps {
  account: Account;
  userName: string;
  showBalance?: boolean;
}

declare interface DoughnutChartProps {
  accounts: Account[];
}
declare interface HeaderPropsBox {
  type?: "title" | "welcome";
  title: string;
  subtext?: string;
  userName?: string;
}

declare interface RightSidebarProps {
  user: User;
  banks: Account[];
}

declare interface TotalBalanceBoxProps {
  accounts: Account[];
  totalBanks: number;
  totalBalance: number;
}
