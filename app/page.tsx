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
        <section
            id="hero"
            className="relative my-4 overflow-hidden rounded-2xl bg-[url('/images/xado.jpg')] bg-cover bg-center px-5 py-20 text-center text-white sm:px-8 sm:py-24 md:px-10 md:py-32 lg:px-14 lg:py-40"
        >
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative">
                <h1 className="text-[1.6rem] leading-tight font-medium tracking-tight sm:text-[2rem] md:text-[2.4rem]">
                    Магазин XADO — якість і надійність для вашого авто
                </h1>
                <div className="mx-auto mt-4 max-w-[600px]">
                    <p className="mt-3 text-white/90 first:mt-0">
                        Пропонуємо широкий вибір продукції XADO: моторні оливи, присадки,
                        автохімію та автокосметику за вигідними цінами.
                    </p>
                    <p className="mt-3 text-white/90">
                        Піклуйтеся про свій автомобіль разом з перевіреними засобами XADO —
                        якість, якій довіряють тисячі водіїв по всій Україні.
                    </p>
                    <p className="mt-3 text-white/90">Обирайте комфорт і безпеку на дорозі разом з XADO!</p>
                    <p className="mt-3 text-white/90">
                        Завжди можете зателефонувати та уточнити наявність товару — ми
                        завжди раді допомогти!
                    </p>
                </div>
        </div>
        </section>

    <section className="py-14">
        <p className="mb-2 text-center text-[17px] font-medium tracking-widest text-[#6b7280] uppercase">
            Каталог
        </p>
        <CategoryCarousel categories={categories} />
    </section>

    <section id="about-store" className="mx-auto max-w-[900px] border-t border-[#e5e5e5] py-14">
        <div className="mb-10">
            <h3 className="mb-2 text-lg font-medium text-[#1a1a1a]">
                Технології, що повертають життя вашому двигуну
            </h3>
            <p className="leading-relaxed text-[#6b7280]">
                Продукція XADO — це сучасне рішення для ефективного догляду за
                технікою. Інноваційні склади не лише покращують роботу двигуна, а
                й активно відновлюють поверхні, що зазнали зносу. Без складного
                ремонту, без дорогих сервісів — просто застосовуйте та відчувайте
                результат уже з перших кілометрів.
            </p>
        </div>

        <div className="mb-10">
            <h3 className="mb-2 text-lg font-medium text-[#1a1a1a]">
                Не знаєте, що саме обрати для вашого автомобіля?
            </h3>
            <p className="leading-relaxed text-[#6b7280]">
                Ми допоможемо підібрати потрібні засоби: оливи, присадки,
                очищувачі, автохімію — усе, що потрібно для догляду за двигуном,
                трансмісією, паливною системою та іншими важливими вузлами вашого
                авто.
            </p>
        </div>

        <div>
            <h3 className="mb-2 text-lg font-medium text-[#1a1a1a]">Де нас знайти?</h3>
            <p className="leading-relaxed text-[#6b7280]">
                Адреса: м. Кропивницький, вул. Кропивницького, 184
            </p>
            <p className="leading-relaxed text-[#6b7280]">
                Телефон:{" "}
                <a href="tel:+380505850726" className="text-[#c81e1e] hover:underline">
                    +38 (050) 585-07-26
                </a>
            </p>
        </div>
    </section>

    <section className="border-t border-[#e5e5e5] py-14 text-center">
        <h2 className="mb-6 text-[1.6rem] font-medium text-[#1a1a1a]">Ми знаходимося тут</h2>
        <div className="mx-auto max-w-[1000px] overflow-hidden rounded-2xl border border-[#e5e5e5]">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d165.24374415397378!2d32.26845571597863!3d48.49681130613009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d0690062df006b%3A0x6a8c36194f6fa962!2zWGFkbyDQmtGA0L7Qv9C40LLQvdC40YbRjNC60LjQuQ!5e0!3m2!1suk!2sua!4v1775631533411!5m2!1suk!2sua"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    </section>
</>
);
}