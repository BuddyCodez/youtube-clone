"use client";

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
interface FilterCarouselProps {
    value?: string | null;
    isLoading?: boolean;
    onSelect?: (value: string | null) => void;
    data?: {
        value: string;
        label: string;
    }[];
}
export const FilterCarousel = ({ value, isLoading, onSelect, data }: FilterCarouselProps) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);
    return (
        <div className="relative full">
            {/* Left Fade  */}
            <div
                className={cn(
                    "absolute left-12 bottom-0 top-0 w-12 z-10 h-full bg-gradient-to-r from-white to-transparent",
                    "pointer-events-none",
                    current === 1 && "hidden"
                )}
            />
            <Carousel opts={{ align: "start", dragFree: true }} className="w-full px-12" setApi={setApi}>
                <CarouselContent className="-ml-3">
                    {!isLoading && <CarouselItem className="pl-3 basis-auto"
                        onClick={() => onSelect?.(null)}
                    >
                        <Badge
                            variant={!value ? "default" : "secondary"}
                            className="cursor-pointer px-3 py-1 rounded-lg text-sm whitespace-nowrap"
                        >
                            All
                        </Badge>
                    </CarouselItem>}
                    {isLoading && Array.from({ length: 15 }).map((_, i) => (
                        <CarouselItem key={i} className="pl-3 basis-auto">
                            <Skeleton className="rounded-lg px-3 py-1 h-full text-sm w-[100px] font-semibold">
                                &nbsp;
                            </Skeleton>
                        </CarouselItem>
                    ))}
                    {!isLoading && data?.map(item => (
                        <CarouselItem key={item.value} className="pl-3 basis-auto">
                            <Badge
                                variant={value === item.value ? "default" : "secondary"}
                                onClick={() => onSelect?.(item.value)}
                                className="cursor-pointer px-3 py-1 rounded-lg text-sm whitespace-nowrap"
                            >
                                {item.label}
                            </Badge>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 z-20" />
                <CarouselNext className="right-0 z-20" />
            </Carousel>
            {/* Right Fade  */}
            <div
                className={cn(
                    "absolute right-12 bottom-0 top-0 w-12 z-10 h-full bg-gradient-to-l from-white to-transparent",
                    "pointer-events-none",
                    current === count && "hidden"
                )}
            />
        </div>
    )
};