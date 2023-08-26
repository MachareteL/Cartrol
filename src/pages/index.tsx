import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Card from "~/components/Card";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.cars.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Cartrol</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto grid h-screen grid-cols-5 gap-2">
        <div className="col-span-1 h-screen p-4">

        </div>
        <div className="col-span-4 h-screen p-4">
          <Card><div className="px-24"></div></Card>
        </div>
      </main>
    </>
  );
}

