import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const RightSidebar = () => {
  const t = useTranslations("RightSidebar");
  const user = {
    firstName: "Jhon",
    lastName: "Doe",
    email: "jhon.doe@moulaga.com",
  };
  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold text-blue-500">
              {user.firstName[0]}
            </span>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">
              {user.firstName} {user.lastName}
            </h1>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">{t("myBanks")}</h2>
          <Link href="/" className="flex gap-2">
            <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
            <h2 className="text-14 font-semibold text-gray-600">
              {t("addBank")}
            </h2>
          </Link>
        </div>

        <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
          BankCardComponent
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;
