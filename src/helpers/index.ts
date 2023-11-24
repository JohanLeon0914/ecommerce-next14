import { Product } from "../../types";

export const getProducts = async () => {
    const res = await fetch(process.env.API_PRODUCTS!);
    if (!res.ok) {
        throw new Error("Fail to fetch products")
    }
    return res.json()
};

export const getTrendingProducts = async () => {
    const res = await fetch(
        process.env.API_TRENDING_PRODUCTS!
    );
    if (!res.ok) {
        throw new Error("Faild to fetch products");
    }
    return res.json();
};

export const calculatePercentage = (oldPrice: any, price: any) => {
    return !!parseFloat(price) && !!parseFloat(oldPrice)
      ? (100 - (oldPrice / price) * 100).toFixed(0)
      : 0;
  };
  
  export const getSingleProudct = async(_id: number) => {
    const products:Product[] = await getProducts()
    const item = products.find((product) => product._id === _id);
    return item;
  };