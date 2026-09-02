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
            className="flex h-full w-full text-inherit no-underline"
        >
            <div className="grid h-full w-full min-w-0 grid-rows-[auto_1fr_auto] gap-3 rounded-lg border-l-4 border-[#d50000] bg-white p-3 text-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-1 sm:gap-4 sm:border-l-[5px] sm:p-4">
                <div className="flex h-[140px] items-center justify-center sm:h-[180px]">
                    <Image
                        src={getProductImagePath(category, product.image)}
                        alt={product.name}
                        width={200}
                        height={180}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>
                <h3 className="flex items-start justify-center break-words text-[0.85rem] leading-tight text-[#111] sm:text-base">
                    {product.name}
                </h3>
                <div className="flex items-end justify-between gap-1.5 pt-2">
          <span className="shrink-0 rounded bg-black/5 px-1.5 py-1 text-[0.75rem] font-medium text-[#333] sm:px-2 sm:text-[0.85rem]">
            {product.volume}
          </span>
                    <span className="text-right text-[0.9rem] font-bold text-[#d50000] sm:text-[1.1rem]">
            {product.price} грн
          </span>
                </div>
            </div>
        </Link>
    );
}