import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../../actions";
import { generatePublicUrl } from "../../../APIs/urlConfig";

import "./style.css";
import Card, { MaterialButton } from "../../../Components/UI/ReUsable";

const ProductStore = (props) => {
  const dispatch = useDispatch();
  let params = useParams();
  const product = useSelector((state) => state.product);

  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    above15k: 15000,
  });

  useEffect(() => {
    dispatch(getProductBySlug(params.slug));
  }, []);
  return (
    <>
      {
        // productPrice is object therefor can't use map(),-->Use Object.key
        Object.keys(product.productsByPrice).map((key, index) => {
          return (
            <Card
              headerLeft={`${params.slug.split("-")[0]} under ${priceRange[key]}`}
              headerRight={
                <MaterialButton
                  title={"VIEW ALL"}
                  style={{
                    width: "100px",
                  }}
                  bgColor="#2874f0"
                  fontSize="12px"
                />
              }
              style={{
                width: "calc(100% - 40px)",
                margin: "20px",
              }}
            >
              {/* <div className="cardHeader">
                <div>
                  {params.slug.split("-")[0]} under {priceRange[key]}{" "}
                </div>
                <button>View All</button>
              </div> */}

              <div style={{ display: "flex" }}>
                {product.productsByPrice[key].map((product, index) => (
                  <Link
                    to={`/${product.slug}/${product._id}/p`}
                    style={{ display: "block" }}
                    key={index}
                    className="productContainer"
                  >
                    <div className="productImgContainer">
                      <img
                        src={generatePublicUrl(product.productPictures[0].img)}
                        alt=""
                      />
                    </div>
                    <div className="productInfo">
                      <div style={{ margin: "5px 0" }}>{product.name}</div>
                      <div>
                        <span>4.3</span>
                        <span>3353</span>&nbsp;
                      </div>
                      <div className="productPrice">{product.price}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          );
        })
      }
    </>
  );
};

export default ProductStore;
