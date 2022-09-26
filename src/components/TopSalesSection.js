import DisplayLoading from "./DisplayLoading";
import ProductCard from "./ProductCard";

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react'
import { fetchTopSales } from '../store/topSalesSlice';

function TopSalesSection() {

    const dispatch = useDispatch();
    const ProductsList = useSelector(state => state.topSales.products);
    const isLoading = useSelector(state => state.topSales.loading);
    const [loadingState, setLoadingState] = useState(false);
    const [shouldNotBeDisplayed, setShouldNotBeDisplayed] = useState(false);

    useEffect(() => {
        dispatch(fetchTopSales());
    }, []);

    useEffect(() => {
        if (!isLoading && ProductsList.length < 1) setShouldNotBeDisplayed(true);
        else setShouldNotBeDisplayed(false);
        if (loadingState != isLoading) setLoadingState(isLoading);
    }, [isLoading, ProductsList]);

    return (shouldNotBeDisplayed ? <></> :
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            <DisplayLoading loading={loadingState}>
                <div className="row">
                    {ProductsList.map(o =>
                        <div key={o.id} className="col-4">
                            <ProductCard id={o.id} imgSrc={o.images[0]} name={o.title} price={o.price}/>
                        </div>)}
                </div>
            </DisplayLoading>
        </section >
    );
}

export default TopSalesSection;


