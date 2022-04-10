import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Homepage from "./Containers/HomePage/homepage";
import ProductListPage from "./Containers/ProductListPage";
import "./App.css";
import { isUserLoggedIn, updateCart } from "./actions";
import ProductDetailsPage from "./Containers/ProductDetailsPage";
import CartPage from "./Containers/CartPage";
import CheckOutPage from "./Containers/CheckOutPage";
import OrderPage from "./Containers/OrderPage";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authentcate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(updateCart());
  }, [auth.authentcate]);

  useEffect(() => {
    dispatch(updateCart());
  }, [auth.authentcate]);

  return (
    <Router>
      <Routes>
        <Route path="/" exect element={<Homepage />} />
        <Route
          path="/:productSlug/:productId/p"
          element={<ProductDetailsPage />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/:slug" exect element={<ProductListPage />} />
        <Route path="/account/orders" exect element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
