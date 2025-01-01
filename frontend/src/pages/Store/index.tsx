import React from "react";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const products = [
  {
    id: 1,
    name: "Cup ticket",
    price: 10,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Pro profile",
    price: 15,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "SOT pro",
    price: 20,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "rase pro",
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
          className="bg-white border rounded-lg p-4 m-4 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer hover:bg-gray-100"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-32 object-cover rounded-md"
          />
          <div className="mt-2 flex justify-between items-center">
            <div className="text-gray-800 text-lg flex justify-between font-semibold">
              <span>{product.name}</span>
            </div>
            <ConfirmationNumberIcon />
          </div>
          <div>${product.price}</div>
        </div>
      ))}
    </div>
  );
};

export default Store;
