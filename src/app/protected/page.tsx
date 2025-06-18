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

  // Fetch posts with basic relations first
  const { data: posts, error } = await supabase
    .from('Post') // Try 'posts' if this doesn't work
    .select(`
      *,
      user:user_id (name, email),
      category:category_id (name)
    `)
    .order('created_at', { ascending: false });

  // For now, we'll set tags as empty arrays to prevent errors
  // You can fetch tags separately if needed
  const postsWithTags = posts?.map(post => ({
    ...post,
    tags: [] // Temporary fix - empty array instead of undefined
  }));

  // Log both data and error for debugging
  console.log('Fetched posts:', postsWithTags);
  console.log('Query error:', error);

  // If the above doesn't work, try this alternative approach:
  // const { data: posts, error } = await supabase
  //   .from('posts') // lowercase table name
  //   .select(`
  //     *,
  //     users!user_id (name, email),
  //     categories!category_id (name)
  //   `)
  //   .order('created_at', { ascending: false });

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link href="/protected/new">
          <Button>Create New Post</Button>
        </Link>
      </div>
      <PostList posts={postsWithTags || []} />
    </div>
  );
}