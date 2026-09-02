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
                ? "border-[#d62828] bg-[#d62828] text-white"
                : "border-[#ddd] bg-[#f1f1f1] text-[#333] hover:border-[#ffc300] hover:bg-[#ffc300] hover:text-black"
        }`;

    return (
        <div>
            {subCategories.length > 0 && (
                <div className="mx-auto my-5 max-w-[800px] text-center">
                    <button
                        onClick={() => setShowFilters((v) => !v)}
                        className="rounded-md bg-[#d62828] px-6 py-2.5 font-bold text-white shadow-[0_4px_6px_rgba(214,40,40,0.2)] transition-transform hover:-translate-y-0.5 hover:bg-[#b51c1c]"
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