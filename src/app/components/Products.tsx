import { Product } from "../../../types";
import { getProducts } from "@/helpers";
import ProductsClient from "./ProductsClient";

const Products = async () => {
  const products: Product[] = await getProducts();

  return (
    <div>
      <ProductsClient products={products} />
    </div>
  );
};

export default Products;
