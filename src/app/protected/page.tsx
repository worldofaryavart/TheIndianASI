import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import Link from "next/link";
import { Button } from "@mui/material";
import { PostList } from "@/components/Blog/PostList";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: posts } = await supabase
    .from('Post')
    .select(`
      *,
      user:user_id (name, email),
      category:category_id (name),
      tags (name)
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link href="/protected/new">
          <Button>Create New Post</Button>
        </Link>
      </div>
      <PostList posts={posts || []} />
    </div>
  );
}
