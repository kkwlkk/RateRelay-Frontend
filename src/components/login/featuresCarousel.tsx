'use client';

import { useEffect, useState } from 'react';
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { features } from '@/data/login/carouselFeatures';
import { cn } from '@/lib/utils';

export function FeaturesCarousel() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });

        return () => {
            api.off("select", () => {
                setCurrent(api.selectedScrollSnap());
            });
        };
    }, [api]);

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
                dragFree: false,
                containScroll: "trimSnaps"
            }}
            plugins={[
                Autoplay({
                    delay: 4000,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                }),
            ]}
            setApi={setApi}
            className="w-full max-w-xl cursor-grab active:cursor-grabbing"
        >
            <CarouselContent className="-ml-4 cursor-grab active:cursor-grabbing select-none">
                {features.map((feature, index) => (
                    <CarouselItem key={index} className="pl-4 select-none">
                        <div className="bg-zinc-800/20 backdrop-blur-sm rounded-2xl p-8 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-300 hover:bg-zinc-800/30">
                            <div className="flex items-start gap-5">
                                <div className="bg-zinc-700/30 p-3 rounded-xl flex-shrink-0">
                                    <feature.icon className="h-6 w-6 text-zinc-100" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-zinc-400 text-base leading-relaxed mb-4">
                                        {feature.description}
                                    </p>
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-2xl font-bold text-zinc-100">
                                            {feature.stat}
                                        </span>
                                        <span className="text-zinc-500 text-sm">
                                            {feature.statLabel}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="flex justify-center items-center gap-2 mt-8">
                {features.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            current === index ? "w-8 bg-white" : "w-2 bg-zinc-600 hover:bg-zinc-500"
                        )}
                        onClick={() => api?.scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </Carousel>
    );
} 