"use client";

import { useCart } from "@/components/CartProvider";
import type { CategorySlug } from "@/lib/products";

export default function AddToCartButton({
                                            id,
                                            category,
                                            name,
                                            price,
                                            volume,
                                            image,
                                        }: {
    id: string;
    category: CategorySlug;
    name: string;
    price: string;
    volume: string;
    image: string;
}) {
    const { addItem } = useCart();

    return (
        <button
            onClick={() => addItem({ id, category, name, price, volume, image })}
            className="mb-6 w-full rounded-full bg-[#1a1a1a] py-3 text-sm font-medium text-white transition-colors hover:bg-[#333] md:mb-8"
        >
            Додати в кошик
        </button>
    );
}