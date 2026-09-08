import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import Image from "next/image";
import type { Metadata } from "next";
import {
    getAllCategorySlugs,
    getCategoryLabel,
    getProductById,
    getProductImagePath,
    parseTechnicalTable,
    type CategorySlug,
} from "@/lib/products";

type PageParams = { category: string; id: string };

function isValidCategory(category: string): category is CategorySlug {
    return getAllCategorySlugs().includes(category as CategorySlug);
}

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<PageParams>;
}): Promise<Metadata> {
    const { category, id } = await params;
    if (!isValidCategory(category)) return {};

    const product = await getProductById(category, id);
    if (!product) return {};

    return {
        title: `${product.name} | XADO Кропивницький`,
        description: product.description || `${product.name} — купити в магазині XADO Кропивницький.`,
    };
}

export default async function ProductPage({
                                              params,
                                          }: {
    params: Promise<PageParams>;
}) {
    const { category, id } = await params;

    if (!isValidCategory(category)) {
        notFound();
    }

    const product = await getProductById(category, id);

    if (!product) {
        notFound();
    }

    const sections = [
        { title: "Опис", content: product.description },
        { title: "Переваги", content: product.advantages },
        { title: "Вимоги та допуски", content: product.requirements },
        { title: "Технічна інформація", content: product.technicalInfo },
    ].filter((section) => section.content);

    return (
        <div className="py-4 md:py-10">
            <div className="mx-auto max-w-[960px] overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white p-4 md:p-10">
                <div className="relative mx-auto mb-5 h-[250px] w-full max-w-[250px] md:mb-8 md:h-[350px] md:max-w-[350px]">
                    <Image
                        src={getProductImagePath(category, product.image)}
                        alt={product.name}
                        fill
                        sizes="350px"
                        className="rounded-lg object-contain"
                    />
                </div>

                <h1 className="mb-3 text-center text-xl leading-tight font-medium text-[#1a1a1a] md:mb-4 md:text-3xl">
                    {product.name}
                </h1>

                <p className="mb-5 text-center text-xl font-semibold text-[#c81e1e] md:mb-6 md:text-2xl">
                    Ціна: {product.price} грн
                </p>

                {product.volume && (
                    <p className="mb-3 text-[15px] text-[#6b7280] md:text-base">
                        <strong className="font-medium text-[#1a1a1a]">Об&rsquo;єм:</strong> {product.volume}
                    </p>
                )}

                {sections.map((section) => {
                    const isTechTable =
                        section.title === "Технічна інформація" && section.content.includes("<table");
                    const techRows = isTechTable ? parseTechnicalTable(section.content) : [];

                    return (
                        <div key={section.title} className="mt-6 md:mt-8">
                            <h2 className="mb-3 text-lg font-medium text-[#1a1a1a] md:text-xl">{section.title}</h2>
                            {isTechTable && techRows.length > 0 ? (
                                <table className="w-full border-collapse overflow-hidden rounded-lg text-sm md:text-base">
                                    <tbody>
                                    {techRows.map((row) => (
                                        <tr key={row.label} className="border-b border-[#e5e5e5] last:border-b-0">
                                            <td className="bg-[#fafafa] py-2 pr-3 pl-3 font-medium text-[#6b7280]">{row.label}</td>
                                            <td className="py-2 pr-3 pl-3 text-[#1a1a1a]">{row.value}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-[15px] leading-relaxed whitespace-pre-line text-[#6b7280] md:text-base">
                                    {section.content}
                                </p>
                            )}
                        </div>
                    );
                })}

                <AddToCartButton
                    id={product.id}
                    category={category}
                    name={product.name}
                    price={product.price}
                    volume={product.volume}
                    image={product.image}
                />

                <section className="mt-8 rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-5 md:mt-10 md:p-8">
                    <h2 className="mb-3 text-lg font-medium text-[#1a1a1a] md:text-xl">Зв&rsquo;яжіться з нами</h2>
                    <p className="mb-2.5 text-sm text-[#6b7280] md:text-base">
                        Якщо ви хочете дізнатись про наявність товару, отримати консультацію
                        або поставити будь-які питання щодо продукції XADO — ми завжди готові допомогти.
                    </p>
                    <p className="mb-2.5 text-sm text-[#6b7280] md:text-base">
                        <strong className="font-medium text-[#1a1a1a]">Телефон для зв&rsquo;язку:</strong>{" "}
                        <a href="tel:+380505850726" className="font-medium text-[#c81e1e]">
                            +38 (050) 585-07-26
                        </a>
                    </p>
                    <p className="mb-2.5 text-sm text-[#6b7280] md:text-base">
                        Ми допоможемо обрати саме те, що потрібно вашому автомобілю.
                    </p>
                    <p className="text-sm text-[#6b7280] md:text-base">Звертайтеся, ми цінуємо кожного клієнта!</p>
                </section>

                <Link
                    href={`/catalog/${category}`}
                    className="mt-8 block rounded-full border border-[#e5e5e5] p-3 text-center font-medium text-[#1a1a1a] transition-colors hover:border-[#1a1a1a] md:mt-10"
                >
                    ← Назад до каталогу
                </Link>
            </div>
        </div>
    );
}