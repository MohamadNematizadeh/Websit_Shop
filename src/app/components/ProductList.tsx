import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string;
}

interface ProductListProps {
  products: Product[];
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.length === 0 ? (
        <p className="text-center col-span-3 text-xl font-semibold text-gray-600">هیچ محصولی یافت نشد.</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 shadow-lg rounded-lg transform transition-all hover:scale-105 hover:shadow-xl"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
            <p className="text-md text-gray-500 mb-2">دسته: {product.category}</p>
            <p className="text-green-600 font-bold text-lg mb-4">
              {product.price.toLocaleString()} تومان
            </p>
            <div className="flex space-x-4">
              <button className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all">
                افزودن به سبد خرید
              </button>
              <button
                onClick={() => onDelete(product.id)} // Call onDelete passed from parent
                className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
              >
                حذف محصول
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
