import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard";

const Content = ({ children }) => {
  const [test, setTest] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTest(json);
      });
  }, []);
  return (
    <div className="w-full bg-[#E6ECF3] p-5 flex justify-center items-center gap-4 flex-wrap">
      {test.map((item) => (
        <ProductCard
          image={item.image}
          price={item.price}
          title={item.title}
          description={item.description}
        ></ProductCard>
      ))}
    </div>
  );
};

export default Content;
