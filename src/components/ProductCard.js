import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

/**
 * Отображение товара карточкой
 * @param {number} id - id товара
 * @param {string} imgSrc - адрес изображения товара
 * @param {string} name - название товара
 * @param {number} price - цена товара
 */

function ProductCard(props) {

    const {id, imgSrc, name, price} = props;
    return (
        <div className="card catalog-item-card">
            <img src={imgSrc}
                className="card-img-top img-fluid" alt={name} />
            <div className="card-body">
                <p className="card-text">{name}</p>
                <p className="card-text">{price} руб.</p>
                <Link to={`/products/${id}.html`} className="btn btn-outline-primary">Заказать</Link>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    id: PropTypes.number, 
    imgSrc: PropTypes.string, 
    name: PropTypes.string, 
    price: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
};

export default ProductCard;