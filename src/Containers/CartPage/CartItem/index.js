import React, { useState } from "react";
import { generatePublicUrl } from "../../../APIs/urlConfig";
import "./style.css";

const CartItem = (props) => {
  const [quantity, setQuantity] = useState(props.cartItem.quantity);
  console.log({ quantity });
  const { _id, name, price, img } = props.cartItem;

  const onQuantityIncrement = () => {
    setQuantity(quantity + 1);
    props.onQuantityIncrement(_id, quantity + 1);
  };

  const onQuantityDecrement = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
    props.onQuantityDecrement(_id, quantity - 1);
  };

  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={generatePublicUrl(img)} alt={""} />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>Rs. {price}</p>
          </div>
          <div>Delivery in 3 - 5 days</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        {/* quantity control */}
        <div className="quantityControl">
          <button onClick={onQuantityDecrement}>-</button>
          <input value={quantity} readOnly />
          <button onClick={onQuantityIncrement}>+</button>
        </div>
        <button className="cartActionBtn">save for later</button>
        <button
          className="cartActionBtn"
          onClick={() => props.onRemoveCartItem(_id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
