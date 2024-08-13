import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.action";
import Image from "next/image";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userLoggedIn = await getLoggedInUser();

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={userLoggedIn} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileNav />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
