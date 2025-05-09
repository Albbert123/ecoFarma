"use client";

import FaqForm from "@/components/public/faq/FaqForm";
import { useBootstrap } from "@/hooks/useBootstrap";

export default function FAQPage() {
    useBootstrap();
    return <FaqForm />;
}