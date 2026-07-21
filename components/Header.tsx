import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-[#d62828] text-white shadow-md">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3.5 md:px-6">
                <Link href="/" className="text-2xl font-bold text-white md:text-[28px]">
                    XADO
                </Link>
                <nav>
                    <ul className="flex flex-wrap gap-4 md:gap-6">
                        <li>
                            <Link href="/#hero" className="text-[15px] font-medium hover:text-[#ffc300] md:text-base">
                                Про нас
                            </Link>
                        </li>
                        <li>
                            <Link href="/#categories" className="text-[15px] font-medium hover:text-[#ffc300] md:text-base">
                                Категорії
                            </Link>
                        </li>
                        <li>
                            <Link href="/#contact" className="text-[15px] font-medium hover:text-[#ffc300] md:text-base">
                                Контакти
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}