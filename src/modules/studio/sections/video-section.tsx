"use client";

import { trpc } from "@/app/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
export const VideoSection = () => {
    return (
        <Suspense>
            <ErrorBoundary fallback={<p>Failed to load Video</p>}>
                <VideoSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    )
}
const VideoSectionSuspense = () => {
    const [data] = trpc.studio.getMany.useSuspenseInfiniteQuery({
        limit: DEFAULT_LIMIT
    }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
    return (
        <div>
            <h1>Video Section</h1>
        </div>
    );
}