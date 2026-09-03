import Image from "next/image";
import Link from "next/link";
import { getProductImagePath, type CategorySlug, type Product } from "@/lib/products";

export default function ProductCard({
                                        product,
                                        category,
                                    }: {
    product: Product;
    category: CategorySlug;
}) {
    return (
        <Link
            href={`/product/${category}/${product.id}`}
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#e5e5e5] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1a1a1a]/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
        >
            <div className="relative flex h-[160px] items-center justify-center bg-[#fafafa] p-4 sm:h-[200px]">
                <Image
                    src={getProductImagePath(category, product.image)}
                    alt={product.name}
                    width={220}
                    height={200}
                    quality={90}
                    sizes="(min-width: 768px) 220px, 45vw"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                <h3 className="line-clamp-3 flex-1 text-[0.85rem] leading-snug font-medium text-[#1a1a1a] sm:text-[0.95rem]">
                    {product.name}
                </h3>
                <div className="flex items-center justify-between pt-1">
                    <span className="text-[0.7rem] font-medium text-[#6b7280] sm:text-xs">{product.volume}</span>
                    <span className="text-base font-semibold text-[#c81e1e] sm:text-lg">
            {product.price} <span className="text-xs font-normal text-[#6b7280]">грн</span>
          </span>
                </div>
            </div>
        </Link>
    );
}