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
    parseHtmlBlocks,
    parseHtmlTable,
    type CategorySlug,
    type HtmlBlock,
} from "@/lib/products";

type PageParams = { category: string; id: string };

function isValidCategory(category: string): category is CategorySlug {
    return getAllCategorySlugs().includes(category as CategorySlug);
}

function groupHtmlBlocks(blocks: HtmlBlock[]): { type: "ul" | "p"; items: string[] }[] {
    const groups: { type: "ul" | "p"; items: string[] }[] = [];
    for (const block of blocks) {
        const last = groups[groups.length - 1];
        if (block.type === "li") {
            if (last?.type === "ul") last.items.push(block.text);
            else groups.push({ type: "ul", items: [block.text] });
        } else {
            groups.push({ type: "p", items: [block.text] });
        }
    }
    return groups;
}

// A section's content shape (label/value table, multi-column table, HTML list,
// or plain text) varies by category sheet, not by section title — detect it
// from the content itself.
function ProductSection({ title, content }: { title: string; content: string }) {
    const table = content.includes("<table") ? parseHtmlTable(content) : null;
    const blocks = table ? [] : parseHtmlBlocks(content);
    const isLabelValueTable =
        table !== null && table.headers.length === 0 && table.rows.every((row) => row.length === 2);

    return (
        <div className="mt-6 md:mt-8">
            <h2 className="mb-3 text-lg font-medium text-[#1a1a1a] md:text-xl">{title}</h2>
            {table && table.rows.length > 0 ? (
                isLabelValueTable ? (
                    <table className="w-full border-collapse overflow-hidden rounded-lg text-sm md:text-base">
                        <tbody>
                        {table.rows.map(([label, value], i) => (
                            <tr key={i} className="border-b border-[#e5e5e5] last:border-b-0">
                                <td className="bg-[#fafafa] py-2 pr-3 pl-3 font-medium text-[#6b7280]">{label}</td>
                                <td className="py-2 pr-3 pl-3 text-[#1a1a1a]">{value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse overflow-hidden rounded-lg text-sm md:text-base">
                            {table.headers.length > 0 && (
                                <thead>
                                <tr className="border-b border-[#e5e5e5]">
                                    {table.headers.map((header, i) => (
                                        <th
                                            key={i}
                                            className="bg-[#fafafa] py-2 px-3 text-left font-medium text-[#6b7280]"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                            )}
                            <tbody>
                            {table.rows.map((row, i) => (
                                <tr key={i} className="border-b border-[#e5e5e5] last:border-b-0">
                                    {row.map((cell, j) => (
                                        <td key={j} className="py-2 px-3 text-[#1a1a1a]">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )
            ) : blocks.length > 0 ? (
                <div className="space-y-2">
                    {groupHtmlBlocks(blocks).map((group, i) =>
                        group.type === "ul" ? (
                            <ul
                                key={i}
                                className="list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-[#6b7280] md:text-base"
                            >
                                {group.items.map((item, j) => (
                                    <li key={j}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p key={i} className="text-[15px] leading-relaxed text-[#6b7280] md:text-base">
                                {group.items[0]}
                            </p>
                        )
                    )}
                </div>
            ) : (
                <p className="text-[15px] leading-relaxed whitespace-pre-line text-[#6b7280] md:text-base">
                    {content}
                </p>
            )}
        </div>
    );
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
        { title: product.advantagesTitle || "Переваги", content: product.advantages },
        { title: "Вимоги та допуски", content: product.requirements },
        { title: "Примітки", content: product.notes },
        { title: "Застосування", content: product.usage },
        { title: "Розведення", content: product.dilution },
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

                {sections.map((section) => (
                    <ProductSection key={section.title} title={section.title} content={section.content} />
                ))}

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