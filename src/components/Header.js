import logoIMG from '../img/header-logo.png'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeQuery, fetchCatalog } from '../store/catalogSlice';

function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const productsInCart = useSelector(state => state.cart.productsInCart);
    const [fullCartVisible, setFullCartVisible] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (productsInCart > 0) setFullCartVisible(true);
        else setFullCartVisible(false);
    }, [productsInCart]);

    const initiateSearch = () => {
        dispatch(changeQuery(search));
        if (location.pathname === "/catalog.html") dispatch(fetchCatalog());
        else navigate("/catalog.html");
    };

    const handleSearchButton = (evt) => {
        if (!searchVisible) {
            setSearchVisible(true);
        }
        else {
            if (search.trim() === "") setSearchVisible(false);
            else initiateSearch();
        }
    }

    const handleChange = (evt) => {
        const { value } = evt.target;
        setSearch(value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        initiateSearch();
    };

    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <Link to="/" className="navbar-brand">
                            <img src={logoIMG} alt="Bosa Noga" />
                        </Link>
                        <div className="collapase navbar-collapse navbar-main" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">??????????????</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/catalog.html" className="nav-link">??????????????</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about.html" className="nav-link">?? ????????????????</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contacts.html" className="nav-link">????????????????</Link>
                                </li>
                            </ul>
                            <div>
                                <div className="header-controls-pics">
                                    <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handleSearchButton}></div>
                                    <Link to="/cart.html">
                                        <div className="header-controls-pic header-controls-cart">
                                            {fullCartVisible && <div className="header-controls-cart-full">{productsInCart}</div>}
                                            <div className="header-controls-cart-menu"></div>
                                        </div>
                                    </Link>
                                </div>
                                <form data-id="search-form" className={"header-controls-search-form form-inline" + (searchVisible ? "" : " invisible")} onSubmit={handleSubmit}>
                                    <input className="form-control" placeholder="??????????" value={search} onChange={handleChange} />
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;