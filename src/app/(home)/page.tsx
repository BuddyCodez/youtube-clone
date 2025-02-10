import { HomeView } from "@/modules/home/ui/home-view";
import { HydrateClient, trpc } from "../trpc/server";
import { ErrorBoundary } from "react-error-boundary";

export const dynamic = "force-dynamic"; // force nextjs to treat this as a dynamic route, since we are prefetching data.

interface PageProps {
  searchParams: Promise<{
    categoryId?: string;
  }>;
}
const Page = async ({ searchParams }: PageProps) => {
  const { categoryId } = await searchParams;
  void trpc.categories.getMany.prefetch();
  return (
    <HydrateClient>
      <HomeView categoryId={categoryId} />
    </HydrateClient>
  );
}
export default Page;