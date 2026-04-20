import {FooterMarketing} from '@/components/FooterMarketing';
import {HeaderSparse} from '@/components/HeaderSparse';
import {HomeHero} from '@/components/HomeHero';
import {FromTheBlog} from '@/components/FromTheBlog';
import {BentoGrid} from '@/components/home/BentoGrid';
import {FadeInSection} from '@/components/FadeInSection';
import {StaggeredText} from '@/components/StaggeredText';
import {AnnouncementBanner} from '@/components/AnnouncementBanner';


export const metadata = {
  title: 'Meldrum Labs',
  description:
    'Reliable by design. Performant by default.',
};

export default function Page() {
  return (
    <div className="relative">
      <HeaderSparse />
      <div className="pt-20">
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
                    text="Data Systems"
                    className="text-meldrum-green-400 text-5xl md:text-6xl font-extrabold leading-tight tracking-tight [text-shadow:_0_4px_20px_rgb(0_0_0_/_50%)]"
                  />
                  <p className="text-meldrum-orange-400 mt-4 text-lg md:text-xl leading-relaxed [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">Reliable by design. Performant by default.</p>
                </div>
              </div>
            </div>
          </section>

          <FadeInSection>
            <section className='max-w-6xl mx-auto border-l border-r border-iroh-gray-300 dark:border-iroh-gray-800'>
              <BentoGrid />
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


