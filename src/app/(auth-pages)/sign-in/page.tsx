import LoginComponent from "@/components/LoginComponent";

export default async function Login(props: { searchParams: { message?: string; type?: string } }) {
  const searchParams = props.searchParams;
  
  return (
    <div className="min-h-screen w-full">
      <LoginComponent searchParams={searchParams} />
    </div>
  );
}