"use client";
import { useEffect } from "react";

export function useBootstrap() {
  useEffect(() => {
    require("bootstrap/dist/css/bootstrap.min.css");
  }, []);
}
