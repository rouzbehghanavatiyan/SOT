import React from "react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 10,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product 2",
    price: 15,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Product 3",
    price: 20,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Product 4",
    price: 25,
    image: "https://via.placeholder.com/150",
  },
];

const Store = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border rounded-lg p-4 m-4 shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-32 object-cover rounded-md"
          />
          <div className="mt-2 flex justify-between items-center">
            <span className="text-gray-800 text-lg font-semibold">
              ${product.price}
            </span>
            <ConfirmationNumberIcon />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Store;
