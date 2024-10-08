declare type Account = {
  id: string;
  currentBalance: number;
  name: string;
  type: string;
  subtype: string;
  bankId: string;
  transactions: Transaction[];
  shareableId: string;
  mask: string;
  officialName: string;
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
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
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
  isMobile?: boolean;
}

declare interface RightSidebarProps {
  user: User;
  banks: Account[];
  transactions: Transaction[];
}

declare interface TotalBalanceBoxProps {
  accounts: Account[];
  totalBanks: number;
  totalBalance: number;
}
declare interface HomeContentProps {
  user: User;
  accounts: Account[];
  account: Account;
  totalBanks: number;
  totalBalance: number;
  page: string;
  id: string;
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

declare interface getBanksProps {
  userId: string;
}

declare interface getBankProps {
  documentId: string;
}
declare interface getAccountsProps {
  userId: string;
}

declare type Bank = {
  id: string;
  accountId: string;
  bankId: string;
  accessToken: string;
  fundingSourceUrl: string;
  userId: string;
  shareableId: string;
};
declare interface CreateTransactionProps {
  name: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  email: string;
  userId: string;
}
declare interface getTransactionsByBankIdProps {
  bankId: string;
}
declare type Transaction = {
  id: string;
  name: string;
  paymentChannel: string;
  type: string;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image: string;
  type: string;
  createdAt: string;
  channel: string;
  senderBankId: string;
  receiverBankId: string;
};

declare interface getAccountProps {
  bankId: string;
}
declare interface getInstitutionProps {
  institutionId: string;
}
declare interface getTransactionsProps {
  accessToken: string;
}

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare interface CategoryBadgeProps {
  category: string;
}

declare interface TransactionTableProps {
  transactions: Transaction[];
}

declare interface TransactionsProps {
  accounts: Account[];
  transactions: Transaction[];
  id: string;
  page: number;
}

declare interface BankTabItemProps {
  account: Account;
  id?: string;
}
declare interface BankInfoProps {
  account: Account;
  id?: string;
  type: "full" | "card";
}

declare type AccountTypes =
  | "depository"
  | "credit"
  | "loan "
  | "investment"
  | "other";

declare interface PaginationProps {
  page: number;
  totalPages: number;
}

declare interface getBankByAccountIdProps {
  accountId: string;
}

declare interface PaymentTransferFormProps {
  accounts: Account[];
}

declare interface BankDropdownProps {
  accounts: Account[];
  setValue?: UseFormSetValue<any>;
  otherStyles?: string;
}

declare type CategoryCount = {
  name: string;
  count: number;
  totalCount: number;
};

declare interface CategoryProps {
  category: CategoryCount;
}

declare interface FooterProps {
  user: User;
  type?: "mobile" | "desktop";
}