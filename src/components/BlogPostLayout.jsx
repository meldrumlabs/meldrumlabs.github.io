import { ChevronLeftIcon } from '@heroicons/react/20/solid'

import { Prose } from '@/components/Prose'
import References from '@/components/References'
import BlogHeader from '@/components/BlogHeader'
import { FooterMarketing } from '@/components/FooterMarketing'
import { formatDate } from '@/lib/formatDate'

export function BlogPostLayout({ article, references = [], children }) {
  return (
    <div className="relative font-space text-[var(--page-ink)]">
      <BlogHeader />
      <div className="px-6 md:px-10 mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto mt-32 mb-64 max-w-2xl">
            <a
              href="/blog"
              aria-label="Go back to articles"
              className="flex text-sm font-medium text-[var(--page-accent)] mb-5"
            >
              <ChevronLeftIcon className="mr-1 mt-1 h-4 w-4" />
              Blog Index
            </a>
            <article>
              <header className="flex flex-col">
                <h1 className="text-4xl font-space tracking-tight text-[var(--page-heading)] sm:text-4xl">
                  {article.title}
                </h1>
                <span className='mt-1 text-base text-[var(--page-accent)]'>
                  <time dateTime={article.date}>
                    {formatDate(article.date)}
                  </time>
                  <span>{' '}by {article.author}</span>
                </span>
              </header>
              <Prose className="mt-8" data-mdx-content>
                {children}
                {references.length > 0 && (
                  <References references={references} />
                )}
                <div className="text-base text-[var(--page-muted)] italic">
                  Meldrum Labs is a company based in Sweden that specializes in building reliable and innovative data systems
                </div>
              </Prose>
            </article>
          </div>
        </div>
      </div>
      <FooterMarketing />
    </div>
  )
}
