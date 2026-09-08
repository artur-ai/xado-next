"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { getProductImagePath, type CategorySlug, type Product } from "@/lib/products";

export default function ProductCard({
                                        product,
                                        category,
                                    }: {
    product: Product;
    category: CategorySlug;
}) {
    const { addItem } = useCart();

    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#e5e5e5] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1a1a1a]/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <Link
                href={`/product/${category}/${product.id}`}
                className="relative flex h-[160px] items-center justify-center bg-[#fafafa] p-4 sm:h-[200px]"
            >
                <Image
                    src={getProductImagePath(category, product.image)}
                    alt={product.name}
                    width={220}
                    height={200}
                    quality={90}
                    sizes="(min-width: 768px) 220px, 45vw"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
            </Link>

            <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                <Link href={`/product/${category}/${product.id}`}>
                    <h3 className="line-clamp-3 text-[0.85rem] leading-snug font-medium text-[#1a1a1a] sm:text-[0.95rem]">
                        {product.name}
                    </h3>
                </Link>

                <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                    <div className="flex flex-col">
                        <span className="text-[0.7rem] font-medium text-[#6b7280] sm:text-xs">{product.volume}</span>
                        <span className="text-base font-semibold text-[#c81e1e] sm:text-lg">
              {product.price} <span className="text-xs font-normal text-[#6b7280]">грн</span>
            </span>
                    </div>
                    <button
                        onClick={() =>
                            addItem({
                                id: product.id,
                                category,
                                name: product.name,
                                price: product.price,
                                volume: product.volume,
                                image: product.image,
                            })
                        }
                        aria-label="Додати в кошик"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e5e5e5] text-[#1a1a1a] transition-colors hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}