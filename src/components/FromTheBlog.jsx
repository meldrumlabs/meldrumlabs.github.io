import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { formatDate } from '@/lib/formatDate'

export async function FromTheBlog() {
  let posts = await getAllPosts()
  posts = posts.slice(0, 2)

  return (
    <div>
      <div className="flex items-baseline justify-between mb-10">
        <div className="flex items-baseline gap-4">
          <span className="text-sm font-medium text-iroh-gray-600 tabular-nums">02</span>
          <h2 className="text-xl md:text-2xl font-bold text-meldrum-green-400 tracking-tight">
            From the blog
          </h2>
        </div>
        <Link
          href="/blog"
          className="text-sm text-meldrum-orange-400 hover:text-meldrum-orange-300 transition-colors flex items-center gap-1"
        >
          View all
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="border-t border-iroh-gray-800">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-8 border-b border-iroh-gray-800/60 transition-colors hover:border-iroh-gray-700"
          >
            <div className="md:flex md:items-start md:justify-between gap-8">
              <div className="flex-shrink-0 w-32 mb-2 md:mb-0">
                <span className="text-sm text-iroh-gray-500 tabular-nums">
                  {formatDate(post.date)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-meldrum-green-400 group-hover:text-meldrum-green-300 transition-colors">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-meldrum-blue-300 leading-relaxed max-w-2xl">
                  {post.description}
                </p>
              </div>
              <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-iroh-gray-800 text-iroh-gray-600 group-hover:border-iroh-gray-700 group-hover:text-iroh-gray-400 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
