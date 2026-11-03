import { EmptyData } from "@/components/empty-data/EmptyData";
import { emptyDataContent } from "@/mocks/empty-data";

export default function ReportsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f9fb]">
      <EmptyData content={emptyDataContent} />
    </main>
  );
}
