"use client";
import AuthForm from "@/comp/AuthForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function RegisterForm() {
    const searchParams = useSearchParams();
    const redirectRaw = searchParams.get("redirect");
    const redirectUrl = redirectRaw && redirectRaw.startsWith("/") ? redirectRaw : "/";

    return <AuthForm mode="register" redirectOnSuccess={redirectUrl} />;
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterForm />
        </Suspense>
    );
}
