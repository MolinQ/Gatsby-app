import React from "react";
import { PRODUCT_IMAGE_ALT } from "../../constants/imageAlt";

const ProductCard = ({ image, title, price, description }) => {
  console.log(image);
  return (
    <div className="bg-white rounded-lg p-5 w-full max-w-[300px] h-[350px] flex flex-col justify-between gap-3">
      <div className="flex justify-center">
        <img
          className="h-[150px] w-[200px] object-contain"
          src={image}
          alt={PRODUCT_IMAGE_ALT}
        />
      </div>
      <div className="text-[14px] flex flex-col gap-3">
        <p className="text-black truncate">{title}</p>
        <p className="text-black truncate">Price: {price}$</p>
        <p className="text-black truncate">{description}</p>
      </div>
    </div>
  );
};
export default ProductCard;
