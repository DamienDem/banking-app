"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { signIn, signUp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import PlaidLink from "./PlaidLink";
import { useTranslations } from "next-intl";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("AuthForm");

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address: data.address!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          email: data.email,
          password: data.password,
        };

        const newUser = (await signUp(userData)) as User;
        setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Moulage logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Moulaga
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? t("linkAccount") : type === "sign-in" ? t("signIn") : t("signUp")}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user ? t("linkAccountDescription") : t("enterDetails")}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label={t("firstName")}
                      placeholder={t("firstNamePlaceholder")}
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label={t("lastName")}
                      placeholder={t("lastNamePlaceholder")}
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address"
                    label={t("address")}
                    placeholder={t("addressPlaceholder")}
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label={t("city")}
                    placeholder={t("cityPlaceholder")}
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label={t("state")}
                      placeholder={t("statePlaceholder")}
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label={t("postalCode")}
                      placeholder={t("postalCodePlaceholder")}
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="dateOfBirth"
                    label={t("dateOfBirth")}
                    placeholder={t("dateOfBirthPlaceholder")}
                  />
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                label={t("email")}
                placeholder={t("emailPlaceholder")}
              />

              <CustomInput
                control={form.control}
                name="password"
                label={t("password")}
                placeholder={t("passwordPlaceholder")}
              />

              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      {t("loading")}
                    </>
                  ) : type === "sign-in" ? (
                    t("signIn")
                  ) : (
                    t("signUp")
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in" ? t("dontHaveAccount") : t("alreadyHaveAccount")}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? t("signUpLink") : t("signInLink")}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;