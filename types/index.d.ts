declare type Account = {
  id: string;
  balance: number;
  name: string;
};

declare type User = {
  uid: string;
  firstName: string;
  lastName: string;
  address: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  email: string;
  password: string;
};

declare interface CreditCardProps {
  account: Account;
  userName: string;
  showBalance?: boolean;
}

declare interface CreateFundingSourceOptions {
  customerId: string; // Dwolla Customer ID
  fundingSourceName: string; // Dwolla Funding Source Name
  plaidToken: string; // Plaid Account Processor Token
  _links: object; // Dwolla On Demand Authorization Link
}

declare interface createBankAccountProps {
  accessToken: string;
  userId: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
  shareableId: string;
}

declare interface exchangePublicTokenProps {
  publicToken: string;
  user: User;
}

declare type NewDwollaCustomerParams = {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
};

declare type TransferParams = {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
};

declare type AddFundingSourceParams = {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
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

declare interface PlaidLinkProps {
  user: User;
  variant?: "primary" | "ghost";
  dwollaCustomerId?: string;
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

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  email: string;
  password: string;
};

declare interface getUserInfoProps {
  userId: string;
}

declare interface signInProps {
  email: string;
  password: string;
}
