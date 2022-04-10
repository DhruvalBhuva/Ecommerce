import axiosInsance from "./axios";

/** Authorization API */
export const signIn = (user) => axiosInsance.post("/signin", { ...user });
export const signUp = (user) => axiosInsance.post("/signup", { ...user });
export const signOut = () => axiosInsance.post("/signout");

export const getAllCategory = () => axiosInsance.get("/category/getcategory");

/** Products API */
export const getProductBySlug = (slug) => axiosInsance.get(`/product/${slug}`);

export const getProductPage = (cid, type) =>
  axiosInsance.get(`/page/${cid}/${type}`);

export const getProductDetailsById = (productId) =>
  axiosInsance.get(`/productdetails/${productId}`);

/** Cart APIs */

export const getcartItems = () => axiosInsance.post("/cart/getcartitems");
export const addtocart = (payload) =>
  axiosInsance.post("/cart/addtocart", payload);

/** User APIs */
export const getAddress = () => axiosInsance.post("/getaddress");

export const addAddress = (payload) =>
  axiosInsance.post("/address/create", { payload });

export const addorder = (payload) =>
  axiosInsance.post("/addOrder", payload );

export const getorder = () =>
  axiosInsance.get("/getOrders",  );
