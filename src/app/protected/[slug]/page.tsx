import { createClient } from '@/app/utils/supabase/server'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PostStatus } from '@prisma/client'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import MarkdownPreview from '@/components/MarkdownPreview'

interface Post {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  status: PostStatus;
  created_at: string;
  featured_image: string | null;
  views: number;
  user: {
    name: string | null;
    email: string;
  } | null;
  category: {
    name: string;
  } | null;
}

interface Tag {
  name: string;
}

interface PostTag {
  tag: {
    name: string;
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = await createClient()
  
  const { data: post, error } = await supabase
    .from('Post')
    .select(`
      id,
      title,
      excerpt,
      content,
      status,
      created_at,
      featured_image,
      views,
      user:user_id (
        name,
        email
      ),
      category:category_id (
        name
      )
    `)
    .eq('id', params.slug)
    .single()

  if (error || !post) {
    console.error('Error fetching post:', error)
    notFound()
  }

  // Transform the post data to match our interface
  const postData = {
    ...post,
    user: Array.isArray(post.user) ? post.user[0] || null : post.user,
    category: Array.isArray(post.category) ? post.category[0] || null : post.category
  } satisfies Post

  // Get tags for this post
  const { data: postTags } = await supabase
    .from('_PostToTag')
    .select(`
      tag:tag_id (
        name
      )
    `)
    .eq('post_id', postData.id) as PostgrestSingleResponse<PostTag[]>

  const tags: Tag[] = postTags?.map(pt => ({
    name: pt.tag.name
  })) || []

  // Increment view count
  await supabase
    .from('Post')
    .update({ views: postData.views + 1 })
    .eq('id', postData.id)

  return (
    <div className="container mx-auto py-8">
      <Link
        href="/protected"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft size={20} />
        Back to Posts
      </Link>

      <article className="prose prose-lg max-w-none">
        {postData.featured_image && (
          <div className="relative w-full aspect-[2/1] mb-8 rounded-lg overflow-hidden">
            <Image
              src={postData.featured_image}
              alt={postData.title}
              className="object-cover"
              fill
              priority
            />
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-6">
          {postData.category && (
            <Badge variant="secondary">{postData.category.name}</Badge>
          )}
          <Badge
            variant={
              postData.status === 'PUBLISHED'
                ? 'default'
                : postData.status === 'DRAFT'
                ? 'secondary'
                : 'destructive'
            }
          >
            {postData.status.toLowerCase()}
          </Badge>
          {tags.map((tag: Tag) => (
            <Badge key={tag.name} variant="outline">
              {tag.name}
            </Badge>
          ))}
        </div>

        <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>

        <div className="flex items-center gap-4 text-muted-foreground mb-8">
          <span>{postData.user?.name || 'Anonymous'}</span>
          <span>•</span>
          <time>
            {formatDistanceToNow(new Date(postData.created_at), {
              addSuffix: true,
            })}
          </time>
        </div>

        {postData.excerpt && (
          <p className="text-xl text-muted-foreground mb-8">{postData.excerpt}</p>
        )}

        <MarkdownPreview source={postData.content} />

        {tags.length > 0 && (
          <div className="flex gap-2 mt-8">
            {tags.map((tag) => (
              <Badge key={tag.name} variant="outline">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </article>
    </div>
  )
}