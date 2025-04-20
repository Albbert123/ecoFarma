"use client";

import DashboardNav from "@/components/dashboard/DashboardNav";
import SearchHistoryForm from "@/components/dashboard/SearchHistoryForm";
import { useBootstrap } from "@/hooks/useBootstrap";
import withAuth from "@/components/withAuth";
import { getSearchHistory } from "@/services/productService";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { SearchData } from "@/types/productTypes";

function HistoryPage() {
  useBootstrap();
  const { userCorreo } = useAuthStore();
  const [history, setHistory] = useState<SearchData[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userCorreo) {
      getSearchHistory(userCorreo)
        .then(setHistory)
        .catch((err) => setError(err.message));
    }
  }, [userCorreo]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <DashboardNav />
      <SearchHistoryForm history={history} error={error} />
    </div>
  );
}

export default withAuth(HistoryPage, ["usuario"]);
