export default function Footer() {
    return (
        <footer id="contact" className="mt-10 border-t-4 border-red-600 bg-white">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 text-center sm:grid-cols-3 sm:text-left">
                <div>
                    <h3 className="mb-2 font-bold text-red-600">Графік роботи</h3>
                    <p>Пн–Сб: 09:00 – 16:00</p>
                    <p>Нд: 09:00 – 13:00</p>
                </div>

                <div>
                    <h3 className="mb-2 font-bold text-red-600">Контакти</h3>
                    <p>
                        Телефон:{" "}
                        <a href="tel:+380505850726" className="text-red-600 hover:underline">
                            +38 (050) 585-07-26
                        </a>
                    </p>
                    <p>
                        Email:{" "}
                        <a href="mailto:xado.krop@ukr.net" className="text-red-600 hover:underline">
                            xado.krop@ukr.net
                        </a>
                    </p>
                    <p>Адреса: м. Кропивницький, вул. Кропивницького, 184</p>
                </div>

                <div>
                    <h3 className="mb-2 font-bold text-red-600">Ми в соцмережах</h3>

                    <a href="https://www.tiktok.com/@xado.krop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:text-red-600">
                    TikTok
                </a>
            </div>
        </div>
</footer>
);
}