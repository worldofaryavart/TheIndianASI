import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { PostStatus } from '@prisma/client'
import { Calendar, User, Eye } from 'lucide-react'

interface Post {
  id: string
  title: string
  excerpt: string | null
  status: PostStatus
  created_at: string
  user: { name: string | null }
  category: { name: string } | null
  tags: { name: string }[] | null
  featured_image: string | null
}

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/protected/${post.id}`}
          className="group block"
        >
          <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
            
            {/* Main Content Container */}
            <div className="relative h-96 lg:h-80 overflow-hidden">
              
              {/* Background Image */}
              {post.featured_image ? (
                <div className="absolute inset-0">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
                    fill
                    priority
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-slate-900/20 group-hover:from-slate-900/98 group-hover:via-slate-900/80 transition-all duration-500"></div>
                </div>
              ) : (
                // Fallback gradient background
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-slate-900/60 to-pink-900/40">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-slate-900/20"></div>
                </div>
              )}

              {/* Tags positioned at top right */}
              <div className="absolute top-6 right-6 z-10">
                <div className="flex flex-wrap gap-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  {post.category && (
                    <Badge className="bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white border-0 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                      {post.category.name}
                    </Badge>
                  )}
                  <Badge
                    className={`px-3 py-1 text-sm font-medium border-0 backdrop-blur-sm ${
                      post.status === 'PUBLISHED'
                        ? 'bg-gradient-to-r from-green-500/80 to-emerald-500/80 text-white'
                        : post.status === 'DRAFT'
                        ? 'bg-gradient-to-r from-yellow-500/80 to-orange-500/80 text-white'
                        : 'bg-gradient-to-r from-red-500/80 to-rose-500/80 text-white'
                    }`}
                  >
                    {post.status.toLowerCase()}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Color Strip at Bottom */}
            <div className="relative bg-gradient-to-r from-gray-600/95 via-slate-600/95 to-black-600/95 backdrop-blur-md border-t border-purple-400/30">
              <div className="p-6 lg:p-8">
                {/* Title */}
                <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-200 group-hover:to-pink-200 group-hover:bg-clip-text transition-all duration-500">
                  {post.title}
                </h2>

                {/* Excerpt - Shows more on hover */}
                {post.excerpt && (
                  <div className="mb-4 overflow-hidden">
                    <p className="text-purple-100 text-sm lg:text-base leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500 group-hover:text-white">
                      {post.excerpt}
                    </p>
                  </div>
                )}

                {/* Bottom Row - Author, Date, Tags, Read More */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 text-purple-200 group-hover:text-yellow-200 transition-colors duration-300">
                      <User className="w-4 h-4" />
                      <span className="font-medium text-sm lg:text-base">{post.user.name || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-purple-200 group-hover:text-pink-200 transition-colors duration-300">
                      <Calendar className="w-4 h-4" />
                      <time className="font-medium text-sm lg:text-base">
                        {formatDistanceToNow(new Date(post.created_at), {
                          addSuffix: true,
                        })}
                      </time>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge 
                            key={tag.name} 
                            className="bg-white/20 text-white border border-white/30 px-2 py-1 text-xs hover:bg-white/30 transition-colors"
                          >
                            #{tag.name}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge className="bg-white/20 text-white border border-white/30 px-2 py-1 text-xs hover:bg-white/30 transition-colors">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    {/* Read More Indicator */}
                    <div className="flex items-center space-x-2 opacity-70 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <Eye className="w-4 h-4 text-yellow-300" />
                      <span className="text-yellow-300 font-medium text-sm">Read More</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-transparent to-pink-500/20 blur-xl"></div>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}