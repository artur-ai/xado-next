"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { CategorySlug, Product } from "@/lib/products";

export default function ProductCatalog({
                                           products,
                                           category,
                                       }: {
    products: Product[];
    category: CategorySlug;
}) {
    const [showFilters, setShowFilters] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");

    const subCategories = useMemo(() => {
        const unique = new Set(products.map((p) => p.subCategory).filter(Boolean));
        return Array.from(unique);
    }, [products]);

    const filteredProducts =
        activeFilter === "all" ? products : products.filter((p) => p.subCategory === activeFilter);

    const filterButtonClass = (isActive: boolean) =>
        `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            isActive
                ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                : "border-[#e5e5e5] bg-white text-[#1a1a1a] hover:border-[#1a1a1a]"
        }`;

    return (
        <div>
            {subCategories.length > 0 && (
                <div className="mx-auto my-5 max-w-[800px] text-center">
                    <button
                        onClick={() => setShowFilters((v) => !v)}
                        className="rounded-full border border-[#1a1a1a] px-6 py-2.5 text-sm font-medium text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white"
                    >
                        {showFilters ? "Сховати фільтри" : "Показати фільтри"}
                    </button>

                    {showFilters && (
                        <div className="mt-5 flex flex-wrap justify-center gap-2.5 rounded-lg border border-[#eee] bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                            {subCategories.map((sub) => (
                                <button key={sub} onClick={() => setActiveFilter(sub)} className={filterButtonClass(activeFilter === sub)}>
                                    {sub}
                                </button>
                            ))}
                            <button onClick={() => setActiveFilter("all")} className={filterButtonClass(activeFilter === "all")}>
                                Показати всі
                            </button>
                            <button
                                onClick={() => setActiveFilter("all")}
                                className="ml-2.5 rounded-full border border-dashed border-[#bbb] bg-transparent px-4 py-2 text-sm font-medium text-[#777] hover:border-[#d62828] hover:bg-[#f9f9f9] hover:text-[#d62828]"
                            >
                                Прибрати всі фільтри
                            </button>
                        </div>
                    )}
                </div>
            )}

            {filteredProducts.length > 0 ? (
                <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} category={category} />
                    ))}
                </div>
            ) : (
                <p className="my-10 text-center text-gray-500">Товарів у цій категорії поки немає.</p>
            )}
        </div>
    );
}