"use client";

import { useState } from "react";

export default function AddProductForm({ onAdd }: { onAdd: (newProduct: any) => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Date.now(), name, price: Number(price), category, image }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const newProduct = await response.json();
      onAdd(newProduct);
      setName("");
      setPrice("");
      setCategory("");
      setImage("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="w-full bg-gradient-to-t from-green-500 to-teal-400 p-6 z-10">
      <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg form_product border border-gray-300">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">افزودن محصول</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="نام محصول"
              className="input-field focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg w-full py-3 px-4 text-gray-700 border border-gray-300"
            />
          </div>
          <div className="relative">
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
              required
              placeholder="قیمت محصول"
              className="input-field focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg w-full py-3 px-4 text-gray-700 border border-gray-300"
            />
          </div>
          <div className="relative">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="input-field focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg w-full py-3 px-4 text-gray-700 border border-gray-300"
            >
              <option value="">دسته‌بندی را انتخاب کنید</option>
              <option value="پسته">پسته</option>
              <option value="خشکبار">خشکبار</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
          >
            افزودن محصول
          </button>
        </form>
      </div>
    </div>
  );
}
