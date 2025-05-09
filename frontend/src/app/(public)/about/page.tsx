"use client";

import AboutForm from "@/components/public/about/AboutForm";
import { useBootstrap } from "@/hooks/useBootstrap";

export default function AboutPage() {
    useBootstrap();
    return <AboutForm />;
}