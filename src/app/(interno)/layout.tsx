import { InternalTemplate } from '@/modules/internal/components/InternalTemplate'
import { internalContent } from '@/mocks/internal'

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return <InternalTemplate content={internalContent}>{children}</InternalTemplate>
}
