import MainBanner from "./MainBanner";
import TopSalesSection from "./TopSalesSection";
import Catalog from "./Catalog";

function MainPage() {
    return (
        <div className="row">
            <div className="col">
                <MainBanner />
                <TopSalesSection />
                <section className="catalog">
                    <h2 className="text-center">Каталог</h2>
                    <Catalog />
                </section >
            </div>
        </div>
    );
}

export default MainPage;