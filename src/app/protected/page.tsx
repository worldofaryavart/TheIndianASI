import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { PostList } from "@/components/Blog/PostList";
import { PlusCircle, TrendingUp, Users, Clock, Search, Filter } from "lucide-react";
import Link from "next/link";

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

  // Calculate some stats for the dashboard
  const totalPosts = postsWithTags?.length || 0;
  const todaysPosts = postsWithTags?.filter(post => {
    const today = new Date();
    const postDate = new Date(post.created_at);
    return postDate.toDateString() === today.toDateString();
  }).length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
        <div className="relative container mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Community Hub
                  </h1>
                  <p className="text-gray-400 mt-1">Discover, learn, and share with fellow AI enthusiasts</p>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-300">Today: <span className="font-bold text-white">{todaysPosts} posts</span></span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-pink-500/10 to-transparent border border-pink-500/20 rounded-xl px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-pink-400" />
                    <span className="text-sm text-gray-300">Total: <span className="font-bold text-white">{totalPosts} posts</span></span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/protected/new"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Create New Post</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search Section */}
      <div className="container mx-auto px-6 py-6">
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search posts, topics, or authors..."
                  className="w-full bg-slate-900/50 border border-purple-500/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                />
              </div>
            </div>
            
            {/* Filter Options */}
            <div className="flex flex-wrap gap-3">
              <button className="bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <select className="bg-slate-700/50 border border-slate-600/50 text-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50">
                <option>All Categories</option>
                <option>Machine Learning</option>
                <option>Web Development</option>
                <option>Data Science</option>
                <option>AI Ethics</option>
              </select>
              <select className="bg-slate-700/50 border border-slate-600/50 text-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50">
                <option>Latest</option>
                <option>Most Popular</option>
                <option>Most Commented</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3">
            <div className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              {error ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-400 text-2xl">⚠️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Error Loading Posts</h3>
                  <p className="text-gray-400">We encountered an issue while fetching the latest posts.</p>
                </div>
              ) : totalPosts === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PlusCircle className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Posts Yet</h3>
                  <p className="text-gray-400 mb-6">Be the first to share something with the community!</p>
                  <Link
                    href="/protected/new"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>Create First Post</span>
                  </Link>
                </div>
              ) : (
                <PostList posts={postsWithTags || []} />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Popular Tags */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['AI', 'Machine Learning', 'Web Dev', 'Python', 'React', 'Data Science'].map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-sm cursor-pointer hover:from-purple-500/30 hover:to-pink-500/30 transition-all"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/protected/new"
                  className="w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:from-purple-500/20 hover:to-pink-500/20 text-white p-3 rounded-xl flex items-center space-x-3 transition-all"
                >
                  <PlusCircle className="w-5 h-5 text-purple-400" />
                  <span>Write a Blog Post</span>
                </Link>
                <button className="w-full bg-slate-700/30 border border-slate-600/50 hover:bg-slate-600/30 text-gray-300 hover:text-white p-3 rounded-xl flex items-center space-x-3 transition-all">
                  <Users className="w-5 h-5" />
                  <span>Join Discussion</span>
                </button>
              </div>
            </div>
          </div>
        </div> 
      </div> 
    </div>
  )
}

            