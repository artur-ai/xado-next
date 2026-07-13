import CategoryCarousel from "@/components/CategoryCarousel";

const categories = [
    { slug: "revitalizant", name: "Ревіталізанти", image: "/images/revitalizant-new.jpg" },
    { slug: "olyvy", name: "Оливи", image: "/images/olyva.jpg" },
    { slug: "technical_ridini", name: "Технічні рідини", image: "/images/tecnichni.jpg" },
    { slug: "mastyla", name: "Мастила", image: "/images/mastyla.jpg" },
    { slug: "avtoXimia", name: "Автохімія", image: "/images/avtoximia.jpg" },
    { slug: "avtoKosmetika", name: "Автокосметика", image: "/images/avtokosmetika.jpg" },
];

export default function Home() {
    return (
        <>
            <section id="hero" className="py-12">
                <h1 className="text-3xl font-bold sm:text-4xl">
                    Магазин XADO — якість і надійність для вашого авто
                </h1>
                <p className="mt-4 text-gray-700">
                    Пропонуємо широкий вибір продукції XADO: моторні оливи, присадки,
                    автохімію та автокосметику за вигідними цінами.
                </p>
                <p className="mt-2 text-gray-700">
                    Піклуйтеся про свій автомобіль разом з перевіреними засобами XADO —
                    якість, якій довіряють тисячі водіїв по всій Україні.
                </p>
                <p className="mt-2 text-gray-700">
                    Завжди можете зателефонувати та уточнити наявність товару — ми
                    завжди раді допомогти!
                </p>
            </section>

            <h2 id="categories" className="mb-6 text-2xl font-bold">
                Категорії товарів
            </h2>

            <CategoryCarousel categories={categories} />

            <section id="about-store" className="mt-16 space-y-8">
                <div>
                    <h3 className="text-xl font-bold">
                        Технології, що повертають життя вашому двигуну
                    </h3>
                    <p className="mt-2 text-gray-700">
                        Продукція XADO — це сучасне рішення для ефективного догляду за
                        технікою. Інноваційні склади не лише покращують роботу двигуна, а
                        й активно відновлюють поверхні, що зазнали зносу.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold">
                        Не знаєте, що саме обрати для вашого автомобіля?
                    </h3>
                    <p className="mt-2 text-gray-700">
                        Ми допоможемо підібрати потрібні засоби: оливи, присадки,
                        очищувачі, автохімію — усе, що потрібно для догляду за двигуном,
                        трансмісією, паливною системою та іншими важливими вузлами
                        вашого авто.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-bold">Де нас знайти?</h3>
                    <p className="mt-2 text-gray-700">
                        📍 Адреса: м. Кропивницький, вул. Кропивницького, 184
                    </p>
                    <p className="text-gray-700">
                        📞 Телефон:{" "}
                        <a href="tel:+380505850726" className="text-red-600 hover:underline">
                            +38 (050) 585-07-26
                        </a>
                    </p>
                </div>
            </section>

            <section className="my-16">
                <h2 className="mb-4 text-2xl font-bold">Ми знаходимося тут:</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d165.24374415397378!2d32.26845571597863!3d48.49681130613009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d0690062df006b%3A0x6a8c36194f6fa962!2zWGFkbyDQmtGA0L7Qv9C40LLQvdC40YbRjNC60LjQuQ!5e0!3m2!1suk!2sua!4v1775631533411!5m2!1suk!2sua"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                />
            </section>
        </>
    );
}