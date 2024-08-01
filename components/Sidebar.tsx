"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, isLinkActive } from "@/utils";
import { useTranslations } from "next-intl";

const Sidebar = ({ user }: any) => {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Moulaga logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Moulaga</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive = isLinkActive(
            t(`routes.${item.route}`),
            pathname
          );

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={t(`SidebarLabels.${item.label}`)}
                  fill
                  className={cn({
                    "brightness-[3] invert-0": isActive,
                  })}
                />
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {t(`SidebarLabels.${item.label}`)}
              </p>
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default Sidebar;
