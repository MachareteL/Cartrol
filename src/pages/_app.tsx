import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Sidebar from "~/components/Sidebar";
import RequireAuth from "~/components/RequireAuth";
import { useRouter } from "next/router";
import { Quicksand } from "next/font/google";


export const quicksand = Quicksand({
  subsets: ["latin"],
});
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { pathname } = useRouter();
  
  return (
    <SessionProvider session={session}>
      {pathname != "/login" && <Sidebar />}
      <RequireAuth>
        <Component {...pageProps} />
      </RequireAuth>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
