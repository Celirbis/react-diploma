import Preloader from "./Preloader";
import ProductCard from "./ProductCard";
import ErrorMessage from "./ErrorMessage";

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { fetchCatalog, fetchCatalogCategories, changeCategory, DEFAULT_CATEGORY } from '../store/catalogSlice';

function Catalog() {

    const dispatch = useDispatch();
    const ProductsList = useSelector(state => state.catalog.products);
    const CategoriesList = useSelector(state => state.catalog.categories);
    const categoryChosen = useSelector(state => state.catalog.categoryChosen);
    const isLoading = useSelector(state => state.catalog.loading);
    const error = useSelector(state => state.catalog.error);
    const moreItemsAvailable = useSelector(state => state.catalog.moreItemsAvailable);

    useEffect(() => {
        dispatch(changeCategory(DEFAULT_CATEGORY));
        dispatch(fetchCatalog());
        dispatch(fetchCatalogCategories());
    }, [dispatch]);

    const handleLoading = (evt) => {
        dispatch(fetchCatalog());
    };

    const handleCategoryChange = (evt) => {
        dispatch(changeCategory(Number(evt.target.name)));
        dispatch(fetchCatalog());
    };

    return (
        <>
            <ul className="catalog-categories nav justify-content-center">
                <li className="nav-item">
                    <a className={"nav-link" + (categoryChosen === DEFAULT_CATEGORY ? " active" : "")} href="#!" onClick={handleCategoryChange} name="0">Все</a>
                </li>
                {CategoriesList.map(o =>
                    <li className="nav-item" key={o.id}>
                        <a className={"nav-link" + (categoryChosen === o.id ? " active" : "")} href="#!" onClick={handleCategoryChange} name={o.id} >{o.title}</a>
                    </li>)}
            </ul>
            <div className="row">
                {ProductsList.map(o =>
                    <div key={o.id} className="col-4">
                        <ProductCard id={o.id} imgSrc={o.images[0]} name={o.title} price={o.price} />
                    </div>)}
            </div>
            {isLoading && <Preloader />}
            {error && <ErrorMessage error={error}/>}
            {
                moreItemsAvailable && !isLoading && <div className="text-center">
                    <button className="btn btn-outline-primary" onClick={handleLoading}>Загрузить ещё</button>
                </div>
            }
        </>
    );
}

export default Catalog;