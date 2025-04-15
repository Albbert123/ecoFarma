"use client";

import PrescriptionsForm from "@/components/public/prescriptions/PrescriptionsForm";
import { useBootstrap } from "@/hooks/useBootstrap";

export default function PrescriptionsPage() {
    useBootstrap();
    return <PrescriptionsForm />;
}
