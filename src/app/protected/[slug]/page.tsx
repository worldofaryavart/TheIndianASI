import { createClient } from '@/app/utils/supabase/server'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { ArrowLeft, Eye, Clock, User, Bookmark } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PostStatus } from '@prisma/client'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import MarkdownPreview from '@/components/CustomMarkdown'

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

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ [key: string]: string | string[] }>
}

export default async function BlogPost({ params }: PageProps) {
  // Await the params Promise
  const { slug } = await params
  
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
    .eq('id', slug)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-slate-800/50">
        <div className="container mx-auto px-6 py-4">
          <Link
            href="/protected"
            className="inline-flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 group"
          >
            <div className="p-2 rounded-full bg-slate-800/50 group-hover:bg-slate-700/50 transition-colors">
              <ArrowLeft size={18} />
            </div>
            <span className="font-medium">Back to Posts</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
        
        <div className="relative container mx-auto px-6 py-16">
          {/* Status and Category Badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            {postData.category && (
              <Badge className="bg-gradient-to-r from-slate-700 to-slate-600 text-white border-0 px-4 py-2 text-sm font-medium hover:from-slate-600 hover:to-slate-500 transition-all">
                {postData.category.name}
              </Badge>
            )}
            <Badge
              className={`px-4 py-2 text-sm font-medium border-0 transition-all ${
                postData.status === 'PUBLISHED'
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400'
                  : postData.status === 'DRAFT'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:from-amber-500 hover:to-amber-400'
                  : 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400'
              }`}
            >
              {postData.status.toLowerCase()}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-8 leading-tight">
            {postData.title}
          </h1>

          {/* Excerpt */}
          {postData.excerpt && (
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl leading-relaxed">
              {postData.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-8 text-slate-400 mb-12">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-slate-800/50">
                <User size={16} />
              </div>
              <span className="font-medium">{postData.user?.name || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-slate-800/50">
                <Clock size={16} />
              </div>
              <time className="font-medium">
                {formatDistanceToNow(new Date(postData.created_at), {
                  addSuffix: true,
                })}
              </time>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-slate-800/50">
                <Eye size={16} />
              </div>
              <span className="font-medium">{postData.views} views</span>
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {tags.map((tag: Tag) => (
                <Badge 
                  key={tag.name} 
                  className="bg-slate-800/50 text-slate-300 border border-slate-700/50 px-4 py-2 hover:bg-slate-700/50 hover:text-white transition-all cursor-pointer"
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {postData.featured_image && (
        <div className="container mx-auto px-6 mb-16">
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-slate-800/50 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
            <Image
              src={postData.featured_image}
              alt={postData.title}
              className="object-cover"
              fill
              priority
            />
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="container mx-auto px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Content Card */}
          <div className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-8 md:p-12 shadow-2xl">
            <article className="prose prose-lg prose-invert max-w-none">
              <div className="prose-headings:text-white prose-p:text-slate-300 prose-p:leading-relaxed prose-strong:text-white prose-code:text-slate-300 prose-code:bg-slate-800/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-slate-800/50 prose-blockquote:border-slate-600 prose-blockquote:text-slate-300 prose-a:text-slate-400 hover:prose-a:text-white prose-a:transition-colors">
                <MarkdownPreview source={postData.content} />
              </div>
            </article>
          </div>

          {/* Bottom Tags Section */}
          {tags.length > 0 && (
            <div className="mt-12 p-8 bg-gradient-to-r from-slate-900/30 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-slate-800/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 rounded-full bg-slate-800/50">
                  <Bookmark size={16} />
                </div>
                <h3 className="text-xl font-semibold text-white">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <Badge 
                    key={tag.name} 
                    className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 text-slate-200 border-0 px-4 py-2 hover:from-slate-700/80 hover:to-slate-600/80 hover:text-white transition-all cursor-pointer text-sm"
                  >
                    #{tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  )
}