import MainBanner from "./MainBanner";
import Catalog from "./Catalog";
import { useSelector, useDispatch } from 'react-redux';
import { changeQuery, fetchCatalog } from '../store/catalogSlice';
import { useState } from "react";

function CatalogPage() {

    const dispatch = useDispatch();
    const searchQuery = useSelector(state => state.catalog.searchQuery);
    const [form, setForm] = useState({ search: searchQuery });

    const handleChange = (evt) => {
        const { value } = evt.target;
        setForm({ search: value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(changeQuery(form.search));
        dispatch(fetchCatalog());
    };



    return (
        <div>
            <div className="row">
                <div className="col">
                    <MainBanner />
                    <section className="catalog">
                        <h2 className="text-center">Каталог</h2>
                        <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
                            <input className="form-control" placeholder="Поиск" value={form.search} onChange={handleChange} />
                        </form>
                        <Catalog />
                    </section>
                </div>
            </div>
        </div>
    );
}

export default CatalogPage;