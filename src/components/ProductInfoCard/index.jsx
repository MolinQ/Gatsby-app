import TitleText from "../ui/TitleText/inex";
import Separator from "../ui/Separator";
import React from "react";

const ProductInfoCard = ({
  image,
  title,
  description,
  width,
  height,
  ram,
  price,
}) => {
  return (
    <>
      <div className="p-4">
        <TitleText>Product info</TitleText>
      </div>
      <Separator />
      <div className="p-4">
        <div className="w-full flex justify-center">
          <img src={image} alt="product photo" className="rounded-lg" />
        </div>
        <div className="flex flex-col gap-3 p-4 text-base break-words">
          <p>Name: {title}</p>
          <p>Description: {description}</p>
          <p>Size: {`${height} mm X ${width} mm`}</p>
          <p>RAM: {ram}</p>
          <p>Price: {price}</p>
        </div>
      </div>
    </>
  );
};

export default ProductInfoCard;
