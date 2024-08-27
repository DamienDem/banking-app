import HeaderBox from "@/components/HeaderBox";
import PaymentTransferHeader from "@/components/PaymentTransfer";
import PaymentTransferForm from "@/components/PaymentTransferForm";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";

const PaymentTransfer = async () => {
  const user = await getCurrentUser();

  if (user === null) return;
  const accounts = await getAccounts({ userId: user.uid });

  if (!accounts) return;
  return (
    <section className="payment-transfer">
      <PaymentTransferHeader />

      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accounts.data} />
      </section>
    </section>
  );
};

export default PaymentTransfer;
