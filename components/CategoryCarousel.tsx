"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

type Category = {
    slug: string;
    name: string;
    image: string;
};

export default function CategoryCarousel({ categories }: { categories: Category[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "prev" | "next") => {
        scrollRef.current?.scrollBy({
            left: direction === "next" ? 300 : -300,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative">
            <button
                onClick={() => scroll("prev")}
                aria-label="Попередні категорії"
                className="absolute left-1.5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#d50000] text-xl text-white shadow-md hover:bg-[#a00]"
            >
                ❮
            </button>

            <div
                ref={scrollRef}
                className="flex gap-3.5 overflow-x-auto scroll-smooth px-1 py-2.5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {categories.map((category) => (
                    <Link
                        key={category.slug}
                        href={`/catalog/${category.slug}`}
                        className="group relative h-[260px] w-[200px] shrink-0 overflow-hidden rounded-[14px] transition-transform duration-300 hover:scale-[1.03] sm:h-[280px] sm:w-[230px] md:h-[300px] md:w-[250px]"
                    >
                        <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            quality={90}
                            sizes="(min-width: 768px) 250px, (min-width: 640px) 230px, 200px"
                            className="object-cover"
                        />
                        <span className="absolute inset-x-0 bottom-0 bg-black/60 py-4 text-center text-[0.95rem] font-bold text-white">
              {category.name}
            </span>
                    </Link>
                ))}
            </div>

            <button
                onClick={() => scroll("next")}
                aria-label="Наступні категорії"
                className="absolute right-1.5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#d50000] text-xl text-white shadow-md hover:bg-[#a00]"
            >
                ❯
            </button>
        </div>
    );
}