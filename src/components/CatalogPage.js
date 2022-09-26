import MainBanner from "./MainBanner";
import Catalog from "./Catalog";

function CatalogPage() {
    return (
        <div>
            <div className="row">
                <div className="col">
                    <MainBanner />
                    <section className="catalog">
                        <h2 className="text-center">Каталог</h2>
                        <form className="catalog-search-form form-inline">
                            <input className="form-control" placeholder="Поиск" />
                        </form>
                        <Catalog />
                    </section>
                </div>
            </div>
        </div>
    );
}

export default CatalogPage;