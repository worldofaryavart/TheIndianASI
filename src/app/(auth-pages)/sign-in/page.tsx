// src/app/(auth-pages)/sign-in/page.tsx
import LoginComponent from "@/components/LoginComponent";

export default function Login(props: { searchParams?: { message?: string; type?: string } }) {
  return (
    <div className="min-h-screen w-full">
      <LoginComponent searchParams={props.searchParams ?? {}} />
    </div>
  );
}
