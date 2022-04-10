import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

import Layout from "../../Components/Layout/Layout";
import ProductStore from "./ProductStore";
import ProductPage from "./Productpage";
import "./style.css";

const ProductListPage = (props) => {
  let params = useParams();

  const [searchParams] = useSearchParams();
  const cid = searchParams.get("cid");
  const type = searchParams.get("type");

  let content = null;

  const renderProduct = () => {
    switch (type) {
      case "store":
        content = <ProductStore />;
        break;

      case "page":
        content = <ProductPage />;
        break;

      default:
        content = null;
    }
    return content;
  };

  return <Layout>{renderProduct()}</Layout>;
};

export default ProductListPage;
