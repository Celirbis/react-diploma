import MainBanner from "./MainBanner";

function Page404() {
    return (
        <div className="row">
            <div className="col">
                <MainBanner />
                <section className="top-sales">
                    <h2 className="text-center">Страница не найдена</h2>
                    <p>
                        Извините, такая страница не найдена!
                    </p>
                </section>
            </div>
        </div>
    );
}

export default Page404;