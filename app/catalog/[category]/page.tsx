import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductCatalog from "@/components/ProductCatalog";
import {
    getAllCategorySlugs,
    getCategoryLabel,
    getProductsByCategory,
    type CategorySlug,
} from "@/lib/products";

export function generateStaticParams() {
    return getAllCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ category: string }>;
}): Promise<Metadata> {
    const { category } = await params;
    if (!getAllCategorySlugs().includes(category as CategorySlug)) {
        return {};
    }
    const label = getCategoryLabel(category as CategorySlug);
    return {
        title: `${label} XADO | Магазин автохімії та олив`,
        description: `Каталог ${label.toLowerCase()} XADO у Кропивницькому — оригінальна продукція за найкращими цінами.`,
    };
}

export default async function CategoryPage({
                                               params,
                                           }: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;

    if (!getAllCategorySlugs().includes(category as CategorySlug)) {
        notFound();
    }

    const typedCategory = category as CategorySlug;
    const products = await getProductsByCategory(typedCategory);
    const label = getCategoryLabel(typedCategory);

    return (
        <div className="py-8">
            <h1 className="text-center text-[1.6rem] font-bold text-[#c00]">{label}</h1>
            <ProductCatalog products={products} category={typedCategory} />
        </div>
    );
}