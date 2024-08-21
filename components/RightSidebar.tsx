"use client"
import React, { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import BankCard from "@/components/BankCard";
import Category from "./Category";
import { countTransactionCategories } from "@/lib/utils";
import { Button } from "./ui/button";
import { usePlaidLink } from "react-plaid-link";
import { useRouter } from "next/navigation";
import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";

const RightSidebar = ({ user, banks, transactions }: RightSidebarProps) => {
  const t = useTranslations("RightSidebar");
  const categories: CategoryCount[] = countTransactionCategories(transactions);
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);

  const onSuccess = useCallback(async (public_token: string) => {
    await exchangePublicToken({
      publicToken: public_token,
      user,
    });
    router.push("/");
  }, [user, router]);

  const config = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

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
          <Button
            onClick={() => ready && open()}
            disabled={!ready}
            className="flex gap-2 items-center"
            variant="ghost"
          >
            <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
            <span className="text-14 font-semibold text-gray-600">
              {t("addBank")}
            </span>
          </Button>
        </div>

        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10">
              <BankCard
                key={banks[0].id}
                account={banks[0]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                <BankCard
                  key={banks[1].id}
                  account={banks[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}

        <div className="mt-10 flex flex-1 flex-col gap-6">
          <h2 className="header-2">Top categories</h2>
          
          <div className='space-y-5'>
            {categories.map((category) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;