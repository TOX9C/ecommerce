"use client";
import AuthForm from "@/comp/AuthForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
    const searchParams = useSearchParams();
    const redirectRaw = searchParams.get("redirect");
    // Ensure we only redirect to internal paths for security (simple check)
    const redirectUrl = redirectRaw && redirectRaw.startsWith("/") ? redirectRaw : "/";

    return <AuthForm mode="login" redirectOnSuccess={redirectUrl} />;
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}
