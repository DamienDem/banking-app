import { useTranslations } from "next-intl";
import HeaderBox from "./HeaderBox";

const PaymentTransferHeader = () => {
  const t = useTranslations("PaymentTransfer");
  return (
    <HeaderBox
      title={t('paymentTransfer')}
      subtext={t("pleaseProvideAnySpecificDetails")}
    />
  );
};

export default PaymentTransferHeader;
