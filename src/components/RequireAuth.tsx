import { CircularProgress } from "@mui/material";
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

  if (status == "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <CircularProgress className="w-32" />
      </div>
    );
  }

  return <>{children}</>;
}
