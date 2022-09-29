import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainBanner from "./MainBanner";
import Preloader from "./Preloader";

function ProductPage(props) {

    const { id } = useParams();
    const [product, setProduct] = useState();
    const [sizes, setSizes] = useState();
    const [sizeSelected, setSizeSelected] = useState();
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:7070/api/items/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                const filtered = data.sizes.filter(o => o.avalible);
                setSizes(filtered);
                setSizeSelected(filtered[0]?.size);
            });
    }, [id]);

    const handleAmountUp = () => {
        setAmount((prev) => prev + 1);
    };
    const handleAmountDown = () => {
        if (amount > 1) setAmount((prev) => prev - 1);
    };
    const handleChooseSize = ({target}) => { 
        setSizeSelected(target.attributes.name.value);
    };

    const handleBuy = () => { 
        //добавление в корзину
    };

    return (!product ? <Preloader /> : 
        <div className="row">
            <div className="col">
                <MainBanner />
                <section className="catalog-item">
                    <h2 className="text-center">{product.title}</h2>
                    <div className="row">
                        <div className="col-5">
                            <img src={product.images[0]}
                                className="img-fluid" alt="" />
                        </div>
                        <div className="col-7">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Артикул</td>
                                        <td>{product.sku}</td>
                                    </tr>
                                    <tr>
                                        <td>Производитель</td>
                                        <td>{product.manufacturer}</td>
                                    </tr>
                                    <tr>
                                        <td>Цвет</td>
                                        <td>{product.color}</td>
                                    </tr>
                                    <tr>
                                        <td>Материалы</td>
                                        <td>{product.material}</td>
                                    </tr>
                                    <tr>
                                        <td>Сезон</td>
                                        <td>{product.season}</td>
                                    </tr>
                                    <tr>
                                        <td>Повод</td>
                                        <td>{product.reason}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <p>Размеры в наличии: {sizes.map(o =>
                                    <span key={o.size} name={o.size} onClick={handleChooseSize} className={"catalog-item-size" + (o.size === sizeSelected ? " selected" : "")}>
                                        {o.size}
                                    </span>
                                )}</p>
                                <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                    <button className="btn btn-secondary" onClick={handleAmountDown}>-</button>
                                    <span className="btn btn-outline-primary">{amount}</span>
                                    <button className="btn btn-secondary" onClick={handleAmountUp}>+</button>
                                </span>
                                </p>
                            </div>
                            <button className="btn btn-danger btn-block btn-lg" onClick={handleBuy}>В корзину</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ProductPage;