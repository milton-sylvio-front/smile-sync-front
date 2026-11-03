import { CallToAction } from '@/modules/home/components/CallToAction'
import { Features } from '@/modules/home/components/Features'
import { Footer } from '@/modules/home/components/Footer'
import { Header } from '@/modules/home/components/Header'
import { Hero } from '@/modules/home/components/Hero'
import { Stats } from '@/modules/home/components/Stats'
import type { HomeContent } from '@/modules/home/types/home'

type HomePageProps = {
  content: HomeContent
}

export function HomePage({ content }: HomePageProps) {
  return (
    <>
      <Header
        brandName={content.brand.name}
        navigation={content.navigation}
        login={content.login}
        trial={content.trial}
      />
      <main>
        <Hero hero={content.hero} dashboard={content.dashboard} />
        <Features features={content.features} />
        <Stats solutions={content.solutions} />
        <CallToAction pricing={content.pricing} />
      </main>
      <Footer
        brandName={content.brand.name}
        description={content.brand.description}
        footer={content.footer}
      />
    </>
  )
}
