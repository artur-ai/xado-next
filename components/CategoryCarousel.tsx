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
        <div className="flex items-center gap-2">
            <button
                onClick={() => scroll("prev")}
                aria-label="Попередні категорії"
                className="shrink-0 rounded-full border border-gray-300 p-2 text-xl hover:bg-gray-100"
            >
                ❮
            </button>

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {categories.map((category) => (
                    <Link
                        key={category.slug}
                        href={`/catalog/${category.slug}`}
                        className="group relative h-64 w-52 shrink-0 overflow-hidden rounded-2xl transition-transform hover:scale-[1.03]"
                    >
                        <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            sizes="208px"
                            className="object-cover"
                        />
                        <span className="absolute inset-x-0 bottom-0 bg-black/60 py-2 text-center text-sm font-bold text-white">
              {category.name}
            </span>
                    </Link>
                ))}
            </div>

            <button
                onClick={() => scroll("next")}
                aria-label="Наступні категорії"
                className="shrink-0 rounded-full border border-gray-300 p-2 text-xl hover:bg-gray-100"
            >
                ❯
            </button>
        </div>
    );
}