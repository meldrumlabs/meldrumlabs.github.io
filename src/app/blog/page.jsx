import { getAllPosts  } from '@/lib/blog'
import { formatDate } from '@/lib/formatDate'

import { Card } from '@/components/Card'
import BlogHeader from '@/components/BlogHeader'
import { FooterMarketing } from '@/components/FooterMarketing'

export const metadata = {
  title: 'Blog',
  description:
    'Articles related to Meldrum Labs',
}

function Article({ post }) {
  return (
    <article className="px-5 sm:px-0 md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blog/${post.slug}`}>
          {post.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={post.date}
          className="md:hidden"
          decorate
        >
          {formatDate(post.date)}
        </Card.Eyebrow>
        <Card.Description>{post.description}</Card.Description>
        <Card.Cta>Read Post</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={post.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(post.date)}
      </Card.Eyebrow>
    </article>
  )
}


export default async function ArticlesIndex() {
  let posts = await getAllPosts()

  return (
    <div className="relative bg-iroh-gray-900 text-iroh-gray-100 font-space">
      <BlogHeader />
      <div className='my-20 mx-auto max-w-2xl min-h-screen lg:mt-32 px-6 md:px-10'>
        <header className="max-w-2xl">
          <h1 className="text-4xl font-space font-bold tracking-tight text-meldrum-green-400 sm:text-4xl">Blog</h1>
          <p className="mt-6 text-base text-meldrum-orange-400">Everything Meldrum Labs Related</p>
        </header>
        <div className="mt-20 md:border-l md:border-iroh-gray-800/60 md:pl-6">
          <div className="flex max-w-3xl flex-col space-y-16">
            {posts.map((post) => (
              <Article key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
      <FooterMarketing />
    </div>
  )
}
