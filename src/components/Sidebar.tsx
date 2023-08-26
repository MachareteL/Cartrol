import React from "react";
import { Link } from "@mui/material";
import { useRouter } from "next/router";
import {
  HomeIcon,
  ChartBarIcon,
  ChartPieIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const { pathname } = useRouter();
  const navigation = [
    {
      name: "Home",
      href: "/",
      current: pathname == "/" ? true : false,
      icon: <HomeIcon className="h-10 w-10" />,
    },
    {
      name: "Dashboard",
      href: "#",
      current: pathname == "/dashboard" ? true : false,
      icon: <ChartPieIcon className="h-10 w-10" />,
    },
    {
      name: "Table",
      href: "#",
      current: pathname == "/table" ? true : false,
      icon: <ChartBarIcon className="h-10 w-10" />,
    },
    {
      name: "Register",
      href: "/register",
      current: pathname == "/register" ? true : false,
      icon: <PlusCircleIcon className="h-10 w-10" />,
    },
  ];
  return (
    <div className="absolute z-40 hidden top-1/2 sm:flex h-screen w-20 -translate-y-1/2 flex-col items-center justify-center gap-14">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="850"
        viewBox="0 0 100 850"
        fill="none"
        className="absolute -z-10 h-full w-full"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50 94.375C4.20561 71.875 0 0 0 0V425V850C0 850 4.20561 778.125 50 755.625C95.7944 733.125 100 681.875 100 681.875V425V168.125C100 168.125 95.7944 116.875 50 94.375Z"
          fill="#FFB800"
        />
      </svg>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`${item.current ? "text-banana bg-white rounded-full p-2" : "text-white"}  `}
          aria-current={item.current ? "page" : undefined}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
}
