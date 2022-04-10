import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartItems } from "../../actions";
import Layout from "../../Components/Layout/Layout";
import { Card, MaterialButton } from "../../Components/UI/ReUsable";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import "./style.css";
import PriceDetails from "../../Components/PriceDetails";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(cart.cartItems);
  console.log({ cartItems });

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, quantity) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };
  const onQuantityDecrement = (_id, quantity) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  return (
    <Layout>
      <div className="cartContainer">
        <Card
          headerLeft={`My Cart`}
          headerRight={<div>Deliver to</div>}
          style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
        >
          {cartItems &&
            Object.keys(cartItems).map((key, index) => (
              <CartItem
                key={index}
                cartItem={cartItems[key]}
                onQuantityIncrement={onQuantityIncrement}
                onQuantityDecrement={onQuantityDecrement}
              />
            ))}
          <div className="order-button">
            <dir style={{ width: "250px" }}>
              <MaterialButton
                title="PLACE ORDER"
                onClick={() => navigate("/checkout")}
              />
            </dir>
          </div>
        </Card>
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (quantity, key) {
            return quantity + cart.cartItems[key].quantity;
          }, 0)} //0 is initial value
          
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, quantity } = cart.cartItems[key];
            return totalPrice + price * quantity;
          }, 0)}
        />
      </div>
    </Layout>
  );
};

export default CartPage;
