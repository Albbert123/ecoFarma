"use client";
import DashboardNav from "@/components/dashboard/DashboardNav";
import OrderForm from "@/components/dashboard/OrderForm";
import { useBootstrap } from "@/hooks/useBootstrap";
import withAuth from "@/components/withAuth";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { getUserOrders } from "@/services/orderService";
import { Order } from "@/types/orderTypes";

function OrderPage() {
  useBootstrap();
  const { userCorreo } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userCorreo) {
        getUserOrders(userCorreo)
        .then(setOrders)
        .finally(() => setLoading(false));
    }
  }, [userCorreo]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <DashboardNav />
      <OrderForm orders={orders} loading={loading} />
    </div>
  );
}

export default withAuth(OrderPage, ["usuario"]);