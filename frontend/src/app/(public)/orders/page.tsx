"use client";

import OrdersForm from "@/components/public/orders/OrdersForm";
import { useBootstrap } from "@/hooks/useBootstrap";

export default function OrdersPage() {
    useBootstrap();
    return <OrdersForm />;
}