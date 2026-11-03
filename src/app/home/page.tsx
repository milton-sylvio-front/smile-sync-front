import { HomePage } from '@/modules/home/containers/HomePage'
import { homeContent } from '@/mocks/home'

export default function Home() {
  return <HomePage content={homeContent} />
}
