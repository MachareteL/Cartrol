import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import RequireAuth from "~/components/RequireAuth";
import { Quicksand } from "next/font/google";
import Layout from "~/components/Layout";

export const quicksand = Quicksand({
  subsets: ["latin"],
});
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <RequireAuth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RequireAuth>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
