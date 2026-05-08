import {FooterMarketing} from '@/components/FooterMarketing';
import {HeaderSparse} from '@/components/HeaderSparse';
import {FromTheBlog} from '@/components/FromTheBlog';
import {BentoGrid} from '@/components/home/BentoGrid';
import {FadeInSection} from '@/components/FadeInSection';
import {HeroSection} from '@/components/home/HeroSection';
export const metadata = {
  title: 'Data Systems, Built with Care',
  description:
    'Meldrum Labs builds reliable, performant data systems.',
};

export default function Page() {
  return (
    <div className="relative bg-iroh-gray-900 text-iroh-gray-100 font-space">
      <HeaderSparse />

      <main className="flex flex-col">
        {/* Hero */}
        <HeroSection />

        {/* Hero-to-content divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
          <div className="border-t border-iroh-gray-800/60" />
        </div>

        {/* Bento grid */}
        <FadeInSection>
          <section className="max-w-6xl mx-auto px-6 md:px-10 w-full py-32">
            <BentoGrid />
          </section>
        </FadeInSection>

        {/* Blog posts */}
        <FadeInSection delay={0.15}>
          <section className="max-w-6xl w-full mx-auto px-6 md:px-10 py-32">
            <FromTheBlog />
          </section>
        </FadeInSection>
      </main>

      <FooterMarketing />
    </div>
  )
}
