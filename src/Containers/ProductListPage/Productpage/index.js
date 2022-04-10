import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

import { getProductPage } from "../../../actions";
import { Card } from "../../../Components/UI/ReUsable/index";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./style.css";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const cid = searchParams.get("cid");
  const type = searchParams.get("type");

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { page } = product;

  useEffect(() => {
    const payload = {
      params: {
        cid,
        type,
      },
    };
    dispatch(getProductPage(payload));
  }, []);

  return (
    <div className="container">
      <h3>{page.title}</h3>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => (
            <a className="banners" key={index} href={banner.navigateTo}>
              <img src={banner.img} alt="" />
            </a>
          ))}
      </Carousel>

      <div className="productsContainer">
        {page.products &&
          page.products.map((product, index) => (
            <Card key={index} className="productCards">
              <img className="productImg" src={product.img} alt="" />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
