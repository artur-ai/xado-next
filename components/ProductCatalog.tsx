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

    const subCategoryOptions = useMemo(() => {
        const map = new Map<string, string>(); // normalized key -> original label for display
        products.forEach((p) => {
            const raw = p.subCategory.trim();
            if (!raw) return;
            const key = raw.toUpperCase();
            if (!map.has(key)) map.set(key, raw);
        });
        return Array.from(map.entries()).map(([key, label]) => ({ key, label }));
    }, [products]);

    const filteredProducts =
        activeFilter === "all"
            ? products
            : products.filter((p) => p.subCategory.trim().toUpperCase() === activeFilter);

    const filterButtonClass = (isActive: boolean) =>
        `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            isActive
                ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                : "border-[#e5e5e5] bg-white text-[#1a1a1a] hover:border-[#1a1a1a]"
        }`;

    return (
        <div>
            {subCategoryOptions.length > 0 && (
                <div className="mx-auto my-5 max-w-[800px] text-center">
                    <button
                        onClick={() => setShowFilters((v) => !v)}
                        className="rounded-full border border-[#1a1a1a] px-6 py-2.5 text-sm font-medium text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white"
                    >
                        {showFilters ? "Сховати фільтри" : "Показати фільтри"}
                    </button>

                    {showFilters && (
                        <div className="mt-5 flex flex-wrap justify-center gap-2.5 rounded-lg border border-[#e5e5e5] bg-white p-4">
                            {subCategoryOptions.map((option) => (
                                <button
                                    key={option.key}
                                    onClick={() => setActiveFilter(option.key)}
                                    className={filterButtonClass(activeFilter === option.key)}
                                >
                                    {option.label}
                                </button>
                            ))}
                            <button
                                onClick={() => setActiveFilter("all")}
                                className={filterButtonClass(activeFilter === "all")}
                            >
                                Показати всі
                            </button>
                        </div>
                    )}
                </div>
            )}

            {filteredProducts.length > 0 ? (
                <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
                    {filteredProducts.map((product, index) => (
                        // Some sheet rows (bulk "розлив" listings) have no ID, so product.id
                        // alone isn't a safe key — it duplicates and corrupts filtered renders.
                        <ProductCard key={`${product.id}-${index}`} product={product} category={category} />
                    ))}
                </div>
            ) : (
                <p className="my-10 text-center text-gray-500">Товарів у цій категорії поки немає.</p>
            )}
        </div>
    );
}