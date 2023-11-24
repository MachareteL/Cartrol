import React from "react";
import Sidebar from "~/components/Sidebar";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();

  return (
    <div className="flex">
      {pathname != "/login" && <Sidebar />}
      <div className="flex-1 overflow-x-hidden">{children}</div>
    </div>
  );
}
