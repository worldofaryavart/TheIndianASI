// src/app/(auth-pages)/sign-in/page.tsx

import LoginComponent from "@/components/LoginComponent";

type PageProps = {
  searchParams?: { message?: string; type?: string };
};

export default function Login({ searchParams }: PageProps) {
  return (
    <div className="min-h-screen w-full">
      <LoginComponent searchParams={searchParams ?? {}} />
    </div>
  );
}
