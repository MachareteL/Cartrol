import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Loading from "./Loading";

export default function RequireAuth({
  children,
}: {
  children: React.ReactElement;
}) {
  const { pathname, push } = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      if (pathname != "/login") {
        void push("/login");
      }
    },
  });

  if (status == "loading") {
    return <Loading />;
  }

  return <>{children}</>;
}
