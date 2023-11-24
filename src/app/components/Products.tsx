import { getProducts } from "@/helpers";
import Container from "./Container";
import ProductsData from "./ProductsData";
import { Product } from "../../../types";
import { categories } from "@/constants/data";
import SliderCategory from "./SliderCategory";

const Products = async () => {
  const products = await getProducts();

  const getProductsForCategory = (category: string) => {
    return products.filter((product: Product) => product.category === category);
  };

  return (
    <Container className="mt-10">
      {categories.map((category) => (
        <div key={category} className="mb-4">
          <h2 className="text-3xl font-bold text-gray-800 uppercase mb-2 text-center">
            <span>{category}</span>
          </h2>
          <SliderCategory products={getProductsForCategory(category)} />
        </div>
      ))}
    </Container>
  );
};

export default Products;
