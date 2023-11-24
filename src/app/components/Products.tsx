import Container from "./Container";
import { Product } from "../../../types";
import SliderCategory from "./SliderCategory";
import { categories } from "@/constants/data";
import { getProducts } from "@/helpers";

const Products = async () => {

  const products: Product[] = await getProducts();

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
