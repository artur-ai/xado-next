"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CartIcon() {
    const { totalCount } = useCart();

    return (
        <Link
            href="/cart"
            className="relative flex items-center gap-1.5 text-[14px] font-medium text-[#1a1a1a] transition-colors hover:text-[#c81e1e] md:text-[15px]"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Кошик
            {totalCount > 0 && (
                <span className="absolute -top-2 -right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c81e1e] px-1 text-[10px] font-semibold text-white">
          {totalCount}
        </span>
            )}
        </Link>
    );
}