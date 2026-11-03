import { CallToAction } from '@/components/home/CallToAction'
import { Features } from '@/components/home/Features'
import { Footer } from '@/components/home/Footer'
import { Header } from '@/components/home/Header'
import { Hero } from '@/components/home/Hero'
import { Stats } from '@/components/home/Stats'
import type { HomeContent } from '../types/home'

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
