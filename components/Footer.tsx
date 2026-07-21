export default function Footer() {
    return (
        <footer className="mt-10 border-t-4 border-[#d32f2f] bg-white text-black">
            <div className="mx-auto max-w-[1200px] px-4 py-7 md:px-6">
                <div className="flex flex-wrap justify-between gap-5">
                    <div className="min-w-[200px] flex-1">
                        <h3 className="mb-2 font-bold text-[#d32f2f]">Графік роботи</h3>
                        <p>Пн–Сб: 09:00 – 16:00</p>
                        <p>Нд: 09:00 – 13:00</p>
                    </div>

                    <div id="contact" className="min-w-[250px] flex-1">
                        <h3 className="mb-2 font-bold text-[#d32f2f]">Контакти</h3>
                        <p>
                            Телефон:{" "}
                            <a href="tel:+380505850726" className="text-[#d32f2f]">
                                +38 (050) 585-07-26
                            </a>
                        </p>
                        <p>
                            Email:{" "}
                            <a href="mailto:xado.krop@ukr.net" className="text-[#d32f2f]">
                                xado.krop@ukr.net
                            </a>
                        </p>
                        <p>Адреса: м. Кропивницький, вул. Кропивницького, 184</p>
                    </div>

                    <div className="min-w-[200px] flex-1">
                        <h3 className="mb-2 font-bold text-[#d32f2f]">Ми в соцмережах</h3>

                        <a href="https://www.tiktok.com/@xado.krop"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="mt-2 inline-flex items-center gap-2.5 font-bold text-black">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="#000"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.14 4.38-2.91 5.76-1.56 1.22-3.66 1.63-5.59 1.23-2.19-.44-4.04-1.87-4.91-3.92-.7-1.64-.69-3.59-.06-5.23.6-1.57 1.83-2.88 3.37-3.5 1.1-.44 2.33-.56 3.49-.41.01 1.34-.01 2.68.01 4.02-.38-.07-.77-.1-1.15-.05-1.13.1-2.1.8-2.58 1.82-.44.92-.41 2.06.05 2.95.43.85 1.25 1.51 2.19 1.72 1.3.29 2.77-.12 3.59-1.16.81-1.02 1.15-2.39 1.11-3.7-.04-5.23-.01-10.47-.02-15.7h2.34z"/>
                            </svg>
                            TikTok
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}