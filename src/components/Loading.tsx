import React from "react";
import dashboardpana from "public/Dashboard-pana.svg";
import Image from "next/image";
import { Gluten } from "next/font/google";

const adlam = Gluten({
  subsets: ["latin"],
});


export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Image src={dashboardpana} alt="" className="relative w-[600px]" />
      <div
        className={`${adlam.className} absolute bottom-48 flex space-x-1 text-3xl`}
      >
        <h1>Loading</h1>
        <h1 className="animate-bounce delay-100">.</h1>
        <h1 className="animate-bounce-slow">.</h1>
        <h1 className="animate-bounce-slower">.</h1>
      </div>
    </div>
  );
}
