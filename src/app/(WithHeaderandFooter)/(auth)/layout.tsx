
import { authOptions } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MobileSidebar from "./_components/MobileSidebar/MobileSidebar";
import Sidebar from "./_components/Sidebar";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);


  if (!session) {
    const headersList = headers();
    const domain = headersList.get("x-forwarded-host") || "";
    const protocol = headersList.get("x-forwarded-proto") || "";
    // const pathname = headersList.get("x-invoke-path") || "";

    const pathname = headersList.get("next-url");
    let url = "/";
    if (pathname) {
      url = url + "?" + encodeURIComponent(pathname);
    }
    redirect(url);

    return null;
  }



  return (
    <NextAuthSessionProvider session={session}>
      <div className="w-[95%] md:w-[85%] lg:w-[85%] xl:w-[95%] 2xl:w-[85%] mx-auto md:py-10 py-10">
        <div className="lg:grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 hidden lg:block">
            <Sidebar />
          </div>
          <div className="lg:col-span-9">
            {/* <PersonalInformation /> */}
            {children}
          </div>
        </div>
      </div>

    <MobileSidebar />





    </NextAuthSessionProvider>
  );
}
