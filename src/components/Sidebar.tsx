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
      icon: (
        <HomeIcon
          
          className={`w-8 sm:h-10 sm:w-10 ${
            pathname == "/" ? "text-banana" : "text-white"
          } z-40 hover:text-banana`}
        />
      ),
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      current: pathname == "/dashboard" ? true : false,
      icon: (
        <ChartPieIcon
          className={`w-8 sm:h-10 sm:w-10 ${
            pathname == "/dashboard" ? "text-banana" : "text-white"
          } z-40 hover:text-banana`}
        />
      ),
    },
    {
      name: "Table",
      href: "#",
      current: pathname == "/table" ? true : false,
      icon: (
        <ChartBarIcon
          className={`w-8 sm:h-10 sm:w-10 ${
            pathname == "/table" ? "text-banana" : "text-white"
          } z-40 hover:text-banana`}
        />
      ),
    },
    {
      name: "Register",
      href: "/register",
      current: pathname == "/register" ? true : false,
      icon: (
        <PlusCircleIcon
          className={`w-8 sm:h-10 sm:w-10 ${
            pathname == "/register" ? "text-banana" : "text-white"
          } z-40 hover:text-banana`}
        />
      ),
    },
  ];
  return (
    <>
      <div className="sticky top-0 hidden h-screen w-20 flex-col items-center justify-center gap-14 sm:flex">
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
            className={`${
              item.current
                ? "bg-white"
                : "relative overflow-hidden text-white after:absolute after:right-0 after:top-0 after:-z-10 after:h-full after:w-0 after:bg-white after:transition-all after:hover:w-full"
            } w-full rounded-l-full px-5 py-2`}
            aria-current={item.current ? "page" : undefined}
          >
            {item.icon}
          </Link>
        ))}
      </div>
      <div className="fixed bottom-0 z-40 flex h-12 w-screen items-center justify-center gap-6 sm:hidden">
        <svg
          width="850"
          height="300"
          viewBox="0 0 850 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fixed -z-10 h-full w-full"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M94.375 50C71.875 95.7944 0 100 0 100L425 100L850 100C850 100 778.125 95.7944 755.625 50C733.125 4.20561 681.875 7.62939e-06 681.875 7.62939e-06L425 7.62939e-06L168.125 7.62939e-06C168.125 7.62939e-06 116.875 4.20561 94.375 50Z"
            fill="#FFB800"
          />
        </svg>
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`${
              item.current
                ? "rounded-full bg-white p-1 text-banana"
                : "text-white"
            }  `}
            aria-current={item.current ? "page" : undefined}
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </>
  );
}
