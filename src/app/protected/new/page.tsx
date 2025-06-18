import { createClient } from '@/app/utils/supabase/server'
import { BlogPostForm } from '@/components/Blog/BlogPostForm'
import { redirect } from 'next/navigation'

export default async function NewBlogPost() {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/sign-in')
  }

  // Fetch categories
  const { data: categories, error: categoriesError } = await supabase
    .from('Category')
    .select('id, name')
    .order('name')

  if (categoriesError) {
    console.error('Error fetching categories:', categoriesError)
  }

  // Fetch tags
  const { data: tags, error: tagsError } = await supabase
    .from('Tag')
    .select('id, name')
    .order('name')

  if (tagsError) {
    console.error('Error fetching tags:', tagsError)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
      <BlogPostForm 
        categories={categories || []}
        tags={tags || []}
        userId={user.id}
      />
    </div>
  )
}