import MainBanner from "./MainBanner";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import {deleteProduct} from '../store/cartSlice';


function CartPage() {

  const dispatch = useDispatch();
  const ProductsList = useSelector(state => state.cart.products);

  const handleOrder = (evt) => {
    evt.preventDefault();
    console.log(ProductsList);
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <MainBanner />
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                {ProductsList.map((o, index) => <tr key={o.id + o.size}>
                  <td scope="row">{index + 1}</td>
                  <td><Link to={`/products/${o.id}.html`}>{o.name}</Link></td>
                  <td>{o.size}</td>
                  <td>{o.amount}</td>
                  <td>{o.price + " руб."}</td>
                  <td>{Number(o.price) * o.amount + " руб."}</td>
                  <td><button className="btn btn-outline-danger btn-sm" onClick={() => dispatch(deleteProduct(index))}>Удалить</button></td>
                </tr>)}
                <tr>
                  <td colSpan="5" className="text-right">Общая стоимость</td>
                  <td>{ProductsList.reduce((acc, o) => (acc + (Number(o.price) * o.amount)), 0) + " руб."}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
              <form className="card-body" onSubmit={handleOrder}>
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input className="form-control" id="phone" placeholder="Ваш телефон" />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input className="form-control" id="address" placeholder="Адрес доставки" />
                </div>
                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="agreement" />
                  <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                </div>
                <button type="submit" className="btn btn-outline-secondary">Оформить</button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CartPage;