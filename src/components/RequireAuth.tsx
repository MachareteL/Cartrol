import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export default function RequireAuth({
  children,
}: {
  children: React.ReactElement;
}) {
  const { pathname, push } = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      if (pathname != "/login") {
        push("/login");
      }
    },
  });
  console.log(data);
  
  return <div>{children}</div>;
}
