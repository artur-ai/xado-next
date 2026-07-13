import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b border-gray-200">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <Link href="/" className="text-2xl font-bold text-red-600">
                    XADO
                </Link>
                <nav>
                    <ul className="flex gap-6 text-sm font-medium">
                        <li>
                            <Link href="/#about-store" className="hover:text-red-600">
                                Про нас
                            </Link>
                        </li>
                        <li>
                            <Link href="/#categories" className="hover:text-red-600">
                                Категорії
                            </Link>
                        </li>
                        <li>
                            <Link href="#contact" className="hover:text-red-600">
                                Контакти
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}