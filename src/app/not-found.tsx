import type { Metadata } from "next";
import { notFoundContent } from "@/mocks/not-found";
import { NotFoundPage } from "@/modules/not-found/containers/NotFoundPage";

export const metadata: Metadata = {
  title: "Página não encontrada | SmileSync",
  description: notFoundContent.description,
};

export default function NotFound() {
  return <NotFoundPage content={notFoundContent} />;
}
