import React from "react";
import { PRODUCT_IMAGE_ALT } from "../../constants/imageAlt";
import Button from "../Button";
import {BUTTON_THEM} from "../../constants/buttonsDependencies";


const ProductCard = ({ image, title, price, description }) => {
  console.log(image);
  return (
    <div className="bg-white rounded-lg p-5 w-full max-w-[300px] h-[400px] flex flex-col justify-between gap-3">
        <div className="flex justify-center">
            <img
                className="h-[150px] w-[200px] object-contain"
                src={image}
                alt={PRODUCT_IMAGE_ALT}
            />
        </div>
        <div className="text-[14px] flex flex-col gap-4">
            <p className="text-black font-bold text-lg truncate">{title}</p>
            <p className="text-dark truncate">{description}</p>
            <p className="text-dark text-lg font-bold truncate flex ">{price}$</p>
        </div>
        <div className='flex flex-row gap-4 mt-4 h-fit'>
            <Button className='text-[14px] opacity-90' size={'h-[37px]'} variant={BUTTON_THEM.DANGER}>Delete</Button>
            <Button className='text-[14px] hover:opacity-90' size={'h-[37px]'} variant={BUTTON_THEM.OUTLINE}>Edit</Button>
        </div>
    </div>
  );
};
export default ProductCard;
