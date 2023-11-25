"use client";
import { useDispatch, useSelector } from "react-redux";
import { Product, StateProps } from "../../../types";
import Container from "./Container";
import ProductsData from "./ProductsData";
import { categories } from "@/constants/data";
import SliderCategory from "./SliderCategory";
import { addSearch } from "@/redux/shoppingSlice";

interface Props {
  products: Product[];
}

const ProductsClient = ({ products }: Props) => {
  const dispatch = useDispatch();

  const getProductsForCategory = (category: string) => {
    return products.filter((product: Product) => product.category === category);
  };

  const { search } = useSelector((state: StateProps) => state.shopping);

  const filteredProductsBySearch = () => {
    return products.filter((product: Product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <>
      {search.length ? (
        filteredProductsBySearch().length ? (
          <Container className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 -mt-10">
            {filteredProductsBySearch().map((item: Product) => (
              <ProductsData item={item} key={item._id} />
            ))}
          </Container>
        ) : (
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
            <h2 className="text-4xl font-bold">
              No results found for "{search}".
            </h2>
            <div className="flex items-center gap-x-5">
              <button
                onClick={() => dispatch(addSearch(""))}
                className="bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-orange-600 duration-300"
              >
                Clear search
              </button>
            </div>
          </div>
        )
      ) : (
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
      )}
    </>
  );
};

export default ProductsClient;
