// /app/profile/page.tsx
"use client";
import DashboardNav from "@/components/dashboard/DashboardNav";
import ProfileForm from "@/components/dashboard/ProfileForm";
import { useBootstrap } from "@/hooks/useBootstrap";
import withAuth from "@/components/withAuth";

function ProfilePage() {
    useBootstrap();

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Sub-navbar de perfil */}
            <DashboardNav />

            <ProfileForm />
        </div>
    );
}

export default withAuth(ProfilePage);
