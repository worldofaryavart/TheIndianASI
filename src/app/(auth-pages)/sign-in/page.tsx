// src/app/(auth-pages)/sign-in/page.tsx
import LoginComponent from "@/components/LoginComponent";

export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

// Keep it simple and just pass the searchParams directly to the component
export default async function Login(props : { searchParams: Promise<Message>}) {
  const searchParams = await props.searchParams;
  return (
    <div className="min-h-screen w-full">
      <LoginComponent searchParams={searchParams ?? {}} />
    </div>
  );
}
