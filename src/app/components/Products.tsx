"use client"
import Container from "./Container";
import { Product } from "../../../types";
import SliderCategory from "./SliderCategory";
import { categories } from "@/constants/data";
import { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Función para obtener productos
    const fetchData = async () => {
      try {
        // Hacer la solicitud a la API
        const response = await fetch('https://apimocha.com/ecommerce-nextjs/products');
        const data = await response.json();

        // Actualizar el estado con los productos obtenidos
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [])

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