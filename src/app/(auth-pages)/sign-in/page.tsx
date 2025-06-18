// src/app/(auth-pages)/sign-in/page.tsx
import LoginComponent from "@/components/LoginComponent";

// Keep it simple and just pass the searchParams directly to the component
export default function Login({ searchParams }: { searchParams: { message?: string; type?: string } }) {
  return (
    <div className="min-h-screen w-full">
      <LoginComponent searchParams={searchParams ?? {}} />
    </div>
  );
}
