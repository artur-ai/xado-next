export type Product = {
    id: string;
    name: string;
    subCategory: string;
    price: string;
    volume: string;
    image: string;
    description: string;
    advantages: string;
    requirements: string;
    technicalInfo: string;
};

export type CategorySlug =
    | "olyvy"
    | "mastyla"
    | "avtoXimia"
    | "avtoKosmetika"
    | "technical_ridini"
    | "revitalizant";

const SHEET_BASE =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpe_R713RMWpCvdUBX-jcJmMuFY724knArV8uP_A4UCMtx-v2f3sdfYq83wZijAv76hb1eXHTuWBKt/pub";

const CATEGORY_CONFIG: Record<CategorySlug, { gid: string; label: string }> = {
    olyvy: { gid: "1130980914", label: "Оливи" },
    mastyla: { gid: "364121324", label: "Мастила" },
    avtoXimia: { gid: "1388474610", label: "Автохімія" },
    avtoKosmetika: { gid: "0", label: "Автокосметика" },
    technical_ridini: { gid: "1042162916", label: "Технічні рідини" },
    revitalizant: { gid: "1497207436", label: "Ревіталізанти" },
};

function parseCsv(text: string): Record<string, string>[] {
    const rows: string[][] = [];
    let field = "";
    let row: string[] = [];
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const next = text[i + 1];

        if (insideQuotes) {
            if (char === '"' && next === '"') {
                field += '"';
                i++;
            } else if (char === '"') {
                insideQuotes = false;
            } else {
                field += char;
            }
        } else {
            if (char === '"') {
                insideQuotes = true;
            } else if (char === ",") {
                row.push(field);
                field = "";
            } else if (char === "\r") {
                // ignore, Windows-style line endings
            } else if (char === "\n") {
                row.push(field);
                field = "";
                rows.push(row);
                row = [];
            } else {
                field += char;
            }
        }
    }
    if (field.length > 0 || row.length > 0) {
        row.push(field);
        rows.push(row);
    }

    const headers = rows[0].map((h) => h.trim());
    return rows
        .slice(1)
        .filter((r) => r.length > 1)
        .map((r) => {
            const obj: Record<string, string> = {};
            headers.forEach((header, i) => {
                obj[header] = (r[i] ?? "").trim();
            });
            return obj;
        });
}

function mapRowToProduct(row: Record<string, string>): Product {
    return {
        id: row["ID"] ?? "",
        name: row["Назва"] ?? "",
        subCategory: row["Категорія"] ?? "",
        price: row["Ціна"] ?? "",
        volume: row["Обєм"] ?? "",
        image: row["Картинка"] ?? "",
        description: row["Опис"] ?? "",
        advantages: row["Переваги"] ?? "",
        requirements: row["Вимоги та допуски"] ?? "",
        technicalInfo: row["Технічна інформація"] ?? "",
    };
}

export async function getProductsByCategory(category: CategorySlug): Promise<Product[]> {
    const { gid } = CATEGORY_CONFIG[category];
    const url = `${SHEET_BASE}?gid=${gid}&single=true&output=csv`;

    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) {
        throw new Error(`Failed to fetch products for category "${category}": ${res.status}`);
    }

    const csvText = await res.text();
    return parseCsv(csvText)
        .filter((row) => row["Назва"])
        .map(mapRowToProduct);
}

export async function getProductById(
    category: CategorySlug,
    id: string
): Promise<Product | undefined> {
    const products = await getProductsByCategory(category);
    return products.find((p) => p.id === id);
}

export function getCategoryLabel(category: CategorySlug): string {
    return CATEGORY_CONFIG[category].label;
}

export function getAllCategorySlugs(): CategorySlug[] {
    return Object.keys(CATEGORY_CONFIG) as CategorySlug[];
}

export function getProductImagePath(category: CategorySlug, imageFileName: string): string {
    return `/images/products/${category}/${imageFileName}`;
}