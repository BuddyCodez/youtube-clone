"use client";
import { trpc } from "@/app/trpc/client";
import { FilterCarousel } from "@/components/utils/filter-carousel";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface CategorySectionProps {
    categoryId?: string;
}
export const CategorySection = ({ categoryId }: CategorySectionProps) => {
    return (
        <Suspense fallback={<FilterCarousel isLoading data={[]} onSelect={() => { }} />}>
            <ErrorBoundary fallback={<div>failed</div>}>
                <CategorySectionSuspense categoryId={categoryId} />
            </ErrorBoundary>
        </Suspense>
    )
}
const CategorySectionSuspense = ({ categoryId }: CategorySectionProps) => {
    const router = useRouter();
    const [categories] = trpc.categories.getMany.useSuspenseQuery();
    const data = categories.map(({ name, id }) => ({ label: name, value: id }));
    const onSelect = (value: string | null) => {
        const url = new URL(window.location.href);
        if (value) {
            url.searchParams.set("categoryId", value);
        } else {
            url.searchParams.delete("categoryId");
        }
        router.push(url.toString());
    };
    return (
        <FilterCarousel value={categoryId} data={data} onSelect={onSelect}/>
    );
};