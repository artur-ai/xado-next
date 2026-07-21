import CategoryCarousel from "@/components/CategoryCarousel";

const categories = [
    {slug: "revitalizant", name: "Ревіталізанти", image: "/images/revitalizant-new.jpg"},
    {slug: "olyvy", name: "Оливи", image: "/images/olyva.jpg"},
    {slug: "technical_ridini", name: "Технічні рідини", image: "/images/tecnichni.jpg"},
    {slug: "mastyla", name: "Мастила", image: "/images/mastyla.jpg"},
    {slug: "avtoXimia", name: "Автохімія", image: "/images/avtoximia.jpg"},
    {slug: "avtoKosmetika", name: "Автокосметика", image: "/images/avtokosmetika.jpg"},
];

export default function Home() {
    return (
        <>
            <section
                id="hero"
                className="relative my-4 overflow-hidden rounded-xl bg-[url('/images/xado.jpg')] bg-cover bg-center px-5 py-20 text-center text-white sm:px-8 sm:py-24 md:px-10 md:py-32 lg:px-14 lg:py-40"
            >
                <div className="absolute inset-0 bg-black/60"/>
                <div className="relative">
                    <h1 className="text-[1.6rem] leading-tight font-bold sm:text-[2rem] md:text-[2.4rem]">
                        Магазин XADO — якість і надійність для вашого авто
                    </h1>
                    <div className="mx-auto mt-3 max-w-[600px]">
                        <p className="mt-3 first:mt-0">
                            Пропонуємо широкий вибір продукції XADO: моторні оливи, присадки,
                            автохімію та автокосметику за вигідними цінами.
                        </p>
                        <p className="mt-3">
                            Піклуйтеся про свій автомобіль разом з перевіреними засобами XADO —
                            якість, якій довіряють тисячі водіїв по всій Україні.
                        </p>
                        <p className="mt-3">Обирайте комфорт і безпеку на дорозі разом з XADO!</p>
                        <p className="mt-3">
                            Завжди можете зателефонувати та уточнити наявність товару — ми
                            завжди раді допомогти!
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-10">
                <h2 id="categories" className="mb-5 text-center text-[1.6rem] font-bold text-[#c00]">
                    Категорії товарів
                </h2>
                <CategoryCarousel categories={categories}/>
            </section>

            <section
                id="about-store"
                className="mx-auto max-w-[900px] rounded-r-xl border-l-[5px] border-[#c00] bg-white px-4 py-6 md:px-10 md:py-9"
            >
                <h3 className="mt-6 text-lg font-bold text-[#c00] first:mt-0">
                    Технології, що повертають життя вашому двигуну
                </h3>
                <p className="my-2.5 leading-relaxed">
                    Продукція XADO — це сучасне рішення для ефективного догляду за
                    технікою. Інноваційні склади не лише покращують роботу двигуна, а
                    й активно відновлюють поверхні, що зазнали зносу. Без складного
                    ремонту, без дорогих сервісів — просто застосовуйте та відчувайте
                    результат уже з перших кілометрів.
                </p>

                <h3 className="mt-6 text-lg font-bold text-[#c00]">
                    Не знаєте, що саме обрати для вашого автомобіля?
                </h3>
                <p className="my-2.5 leading-relaxed">
                    Ми допоможемо підібрати потрібні засоби: оливи, присадки,
                    очищувачі, автохімію — усе, що потрібно для догляду за двигуном,
                    трансмісією, паливною системою та іншими важливими вузлами вашого
                    авто.
                </p>

                <h3 className="mt-6 text-lg font-bold text-[#c00]">Де нас знайти?</h3>
                <p className="my-2.5 leading-relaxed">
                    📍 <strong>Адреса:</strong> м. Кропивницький, вул. Кропивницького, 184
                </p>
                <p className="my-2.5 leading-relaxed">
                    📞 <strong>Телефон:</strong>{" "}
                    <a href="tel:+380505850726" className="text-[#c00]">
                        +38 (050) 585-07-26
                    </a>
                </p>
            </section>

            <section className="py-10 text-center">
                <h2 className="mb-5 text-2xl font-bold">Ми знаходимося тут:</h2>
                <div className="mx-auto max-w-[1000px] overflow-hidden rounded-xl shadow-[0_0_12px_rgba(0,0,0,0.1)]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d165.24374415397378!2d32.26845571597863!3d48.49681130613009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d0690062df006b%3A0x6a8c36194f6fa962!2zWGFkbyDQmtGA0L7Qv9C40LLQvdC40YbRjNC60LjQuQ!5e0!3m2!1suk!2sua!4v1775631533411!5m2!1suk!2sua"
                        width="100%"
                        height="450"
                        style={{border: 0}}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>
        </>
    );
}