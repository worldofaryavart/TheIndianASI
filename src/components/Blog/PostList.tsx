import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { PostStatus } from '@prisma/client'

interface Post {
  id: string
  title: string
  excerpt: string | null
  status: PostStatus
  created_at: string
  user: { name: string | null }
  category: { name: string } | null
  tags: { name: string }[]
  featured_image: string | null
}

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/protected/blog/${post.id}`}
          className="group"
        >
          <article className="bg-card rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-[1.02]">              {post.featured_image && (
              <div className="aspect-video w-full relative overflow-hidden">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  className="object-cover"
                  fill
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                {post.category && (
                  <Badge variant="secondary">{post.category.name}</Badge>
                )}
                <Badge                  variant={
                    post.status === 'PUBLISHED'
                      ? 'default'
                      : post.status === 'DRAFT'
                      ? 'secondary'
                      : 'destructive'
                  }
                >
                  {post.status.toLowerCase()}
                </Badge>
              </div>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{post.user.name || 'Anonymous'}</span>
                <time>
                  {formatDistanceToNow(new Date(post.created_at), {
                    addSuffix: true,
                  })}
                </time>
              </div>
              {post.tags.length > 0 && (
                <div className="flex gap-1 mt-3 flex-wrap">
                  {post.tags.map((tag) => (
                    <Badge key={tag.name} variant="outline" className="text-xs">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}
