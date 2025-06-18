// src/app/(auth-pages)/sign-in/page.tsx
import LoginComponent from "@/components/LoginComponent";

export default function Login({
  searchParams,
}: {
  searchParams: { message?: string; type?: string } | undefined;
}) {
  return (
    <div className="min-h-screen w-full">
      <LoginComponent searchParams={searchParams ?? {}} />
    </div>
  );
}
