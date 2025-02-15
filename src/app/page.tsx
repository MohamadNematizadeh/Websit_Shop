"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://backend-api.liara.run/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
// 
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`https://backend-api.liara.run/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Header />
      <section className="relative mt-20">
        <Image
          src="https://github.com/MohamadNematizadeh/Websit_Shop/blob/main/public/image/2148431062-min.jpg?raw=true"
          alt="background"
          className="w-full h-96 object-cover opacity-80"
          width={1920}
          height={399}
        />
        <div className="main-text-box animate-slideIn font-iransans">
          <h1>
            <span className="highlight">باخشکبار</span>; خشکبار و آجیل
          </h1>
          <span className="custom-text-before">BAKHOSHKBAR</span>
        </div>

        <div className="category-section font-iransans">
          <div className="category-box flex flex-col items-center space-y-2 bg-gray-30 p-4 rounded-lg">
            <Image
              src="public/image/آیکن-بادام-زمینی111-copy.png"
              alt="آیکن بادام زمینی"
              className="w-8 h-8"
              width={32}
              height={32}
            />
            <span className="text-lg font-semibold">آجیل</span>
          </div>
          <div className="category-box flex flex-col items-center space-y-4 bg-gray-40 p-4 rounded-lg">
            <Image
              src="public/image/آیکن-مویز2-copy.png"
              alt="آیکن مویز"
              className="w-8 h-8"
              width={32}
              height={32}
            />
            <span className="text-lg font-semibold">خشکبار</span>
          </div>
          <div className="category-box flex flex-col items-center space-y-2 bg-gray-30 p-4 rounded-lg">
            <Image
              src="public/image/آیکن-بادام-درختی2-1.png"
              alt="آیکن بادام درختی"
              className="w-8 h-8"
              width={32}
              height={32}
            />
            <span className="text-lg font-semibold">بادام</span>
          </div>
          <div className="category-box flex flex-col items-center space-y-2 bg-gray-30 p-4 rounded-lg">
            <Image
              src="public/image/آیکن-پسته2-copy.png"
              alt="آیکن پسته"
              className="w-8 h-8"
              width={32}
              height={32}
            />
            <span className="text-lg font-semibold">پسته</span>
          </div>
        </div>
      </section>
      <br />

      <ProductList products={products} onDelete={handleDelete} />
      <AddProductForm onAdd={handleAddProduct} />

      <Footer />
    </div>
  );
}
