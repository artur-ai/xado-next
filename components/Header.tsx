import Link from "next/link";
import CartIcon from "@/components/CartIcon";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-[#e5e5e5] bg-white/90 backdrop-blur-sm">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 md:px-6">
                <Link href="/" className="text-xl font-medium tracking-tight text-[#1a1a1a] md:text-2xl">
                    XADO
                </Link>
                <nav>
                    <ul className="flex flex-wrap items-center gap-6 md:gap-8">
                        <li>
                            <Link
                                href="/#hero"
                                className="text-[14px] font-medium text-[#1a1a1a] transition-colors hover:text-[#c81e1e] md:text-[15px]"
                            >
                                Про нас
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#categories"
                                className="text-[14px] font-medium text-[#1a1a1a] transition-colors hover:text-[#c81e1e] md:text-[15px]"
                            >
                                Категорії
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#contact"
                                className="text-[14px] font-medium text-[#1a1a1a] transition-colors hover:text-[#c81e1e] md:text-[15px]"
                            >
                                Контакти
                            </Link>
                        </li>
                        <li>
                            <CartIcon />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}