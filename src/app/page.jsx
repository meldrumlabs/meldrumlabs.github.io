import {FooterMarketing} from '@/components/FooterMarketing';
import {HeaderSparse} from '@/components/HeaderSparse';
import {HomeHero} from '@/components/HomeHero';
import {FromTheBlog} from '@/components/FromTheBlog';
import {FeatureCards} from '@/components/home/FeatureCards';
import {LogoCloud} from '@/components/home/LogoCloud';
import {FadeInSection} from '@/components/FadeInSection';
import {StaggeredText} from '@/components/StaggeredText';
import {AnnouncementBanner} from '@/components/AnnouncementBanner';


export const metadata = {
  title: 'Meldrum Labs',
  description:
    'Meldrum Labs builds specialized data systems that require both reliability and innovation.',
};

export default function Page() {
  return (
    <div className="relative">
      <HeaderSparse />
      <div className="pt-20">
        <AnnouncementBanner />
      </div>

      <div className="bg-iroh-gray-50 dark:bg-iroh-gray-900 text-iroh-gray-700 dark:text-iroh-gray-100 h-92 justify-between font-space">
        <main className="mb-auto flex flex-col min-h-92">
          {/* hero */}
          <section className="min-h-92 bg-cover" style={{ height: 560 }}>
            <div className='relative h-10 max-w-6xl mx-auto'>
              <div className='absolute h-full top-0 left-0 bg-linear-to-t from-iroh-gray-300 dark:from-zinc-800 to-transparent' style={{ width: 1 }} />
              <div className='absolute h-full top-0 right-0 bg-linear-to-t from-iroh-gray-300 dark:from-zinc-800 to-transparent' style={{ width: 1 }} />
            </div>
            <div className='relative max-w-6xl mx-auto'>
              <div className='absolute z-10 overflow-hidden w-full'>
                <HomeHero className='' />
              </div>
              <div className="absolute z-20 inset-0 bg-gradient-to-r from-iroh-gray-900 via-iroh-gray-900/80 via-40% to-transparent" />
              <div className="absolute z-40 max-w-6xl mx-auto md:grid md:grid-cols-4 md:gap-4">
                <div className="col-span-2 pl-8 pr-4" style={{ paddingTop: 100 }}>
                  <StaggeredText
                    text="Reliable Data Systems"
                    className="text-meldrum-green-400 text-5xl md:text-6xl font-extrabold leading-tight tracking-tight [text-shadow:_0_4px_20px_rgb(0_0_0_/_50%)]"
                  />
                  <p className="text-meldrum-orange-400 mt-4 text-lg md:text-xl leading-relaxed [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">Meldrum Labs builds specialized data systems that require both reliability and innovation.</p>
                  <div className='flex mt-6 gap-4'>
                    <a
                      href="/blog/announcement"
                      className="my-4 py-3 px-6 font-semibold tracking-wide transition-all duration-300 bg-meldrum-green-600 text-white uppercase hover:bg-meldrum-green-500 hover:scale-105 hover:shadow-lg hover:shadow-meldrum-green-500/25 dark:bg-meldrum-green-500 dark:text-gray-900 dark:hover:bg-meldrum-green-400 plausible-event-name=Home+Hero+Learn+More+Click"
                    >
                      Learn more
                    </a>
                    <a
                      href="/team"
                      className="my-4 py-3 px-6 font-semibold tracking-wide transition-all duration-300 border-2 border-meldrum-green-600/50 text-meldrum-green-400 uppercase hover:border-meldrum-green-400 hover:text-meldrum-green-300 plausible-event-name=Home+Hero+Meet+Team+Click"
                    >
                      Meet the team
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <FadeInSection>
            <section className='max-w-6xl mx-auto border-l border-r border-iroh-gray-300 dark:border-iroh-gray-800'>
              <FeatureCards />
            </section>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <section className='max-w-6xl mx-auto border-l border-r border-iroh-gray-300 dark:border-iroh-gray-800'>
              <LogoCloud />
            </section>
          </FadeInSection>

          <FadeInSection delay={0.15}>
            <section className='max-w-6xl w-full mx-auto px-10 border-r border-l border-t border-iroh-gray-300 dark:border-iroh-gray-800 py-20'>
              <div className='w-full md:px-5'>
                <h2 className='text-xl md:text-2xl tracking-wider font-bold text-meldrum-green-600 dark:text-meldrum-green-400 uppercase'>Blog Posts</h2>
              </div>
              <FromTheBlog />
            </section>
          </FadeInSection>

        </main>
        <FooterMarketing />
      </div>
    </div>
  )
}


