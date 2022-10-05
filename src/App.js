import React from 'react';
//import './css/style.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import CatalogPage from './components/CatalogPage';
import AboutPage from './components/AboutPage';
import ContactsPage from './components/ContactsPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import Page404 from './components/Page404';

function App() {
  return (
    <>
        <Header/>
        <main className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/catalog.html" element={<CatalogPage />} />
            <Route path="/products/:id.html" element={<ProductPage />} />
            <Route path="/about.html" element={<AboutPage />} />
            <Route path="/contacts.html" element={<ContactsPage />} />
            <Route path="/cart.html" element={<CartPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
        <Footer/>
    </>
  );
}

export default App;
