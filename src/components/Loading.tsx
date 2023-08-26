import { CircularProgress } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <CircularProgress className="w-32" />
    </div>
  );
}
