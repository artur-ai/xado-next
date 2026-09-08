"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { getProductImagePath, type CategorySlug } from "@/lib/products";

export default function CartPage() {
    const { items, updateQuantity, removeItem, totalPrice } = useCart();

    if (items.length === 0) {
        return (
            <div className="py-20 text-center">
                <h1 className="mb-3 text-2xl font-medium text-[#1a1a1a]">Кошик порожній</h1>
                <p className="mb-6 text-[#6b7280]">Додайте товари з каталогу, щоб побачити їх тут.</p>
                <Link
                    href="/#categories"
                    className="inline-block rounded-full bg-[#1a1a1a] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#333]"
                >
                    Перейти до каталогу
                </Link>
            </div>
        );
    }

    return (
        <div className="py-8 md:py-10">
            <h1 className="mb-8 text-2xl font-medium text-[#1a1a1a]">Кошик</h1>

            <div className="flex flex-col gap-4">
                {items.map((item) => (
                    <div
                        key={`${item.category}-${item.id}`}
                        className="flex items-center gap-4 rounded-xl border border-[#e5e5e5] bg-white p-4"
                    >
                        <div className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
                            <Image
                                src={getProductImagePath(item.category as CategorySlug, item.image)}
                                alt={item.name}
                                fill
                                sizes="80px"
                                className="object-contain"
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="line-clamp-2 text-sm font-medium text-[#1a1a1a] sm:text-[15px]">{item.name}</p>
                            <p className="text-xs text-[#6b7280] sm:text-sm">{item.volume}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => updateQuantity(item.id, item.category, item.quantity - 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e5e5e5] text-[#1a1a1a] hover:border-[#1a1a1a]"
                                aria-label="Зменшити кількість"
                            >
                                −
                            </button>
                            <span className="w-5 text-center text-sm">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, item.category, item.quantity + 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e5e5e5] text-[#1a1a1a] hover:border-[#1a1a1a]"
                                aria-label="Збільшити кількість"
                            >
                                +
                            </button>
                        </div>

                        <p className="w-20 shrink-0 text-right text-sm font-semibold text-[#c81e1e] sm:text-base">
                            {(parseFloat(item.price.replace(",", ".")) || 0) * item.quantity} грн
                        </p>

                        <button
                            onClick={() => removeItem(item.id, item.category)}
                            aria-label="Видалити"
                            className="shrink-0 text-[#6b7280] hover:text-[#c81e1e]"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex flex-col items-end gap-4 border-t border-[#e5e5e5] pt-6">
                <p className="text-lg font-medium text-[#1a1a1a]">
                    Разом: <span className="font-semibold text-[#c81e1e]">{totalPrice} грн</span>
                </p>
                <button
                    disabled
                    className="w-full cursor-not-allowed rounded-full bg-[#1a1a1a]/40 py-3 text-sm font-medium text-white sm:w-auto sm:px-10"
                >
                    Оформити замовлення (скоро)
                </button>
                <p className="text-xs text-[#6b7280]">
                    Оформлення замовлень стане доступним після підключення бекенду.
                </p>
            </div>
        </div>
    );
}