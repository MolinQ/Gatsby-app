import React from "react";
import ProductCard from "../../../components/ProductCard";
import { ReactComponent as SortIcon } from "../../../images/sort-svgrepo-com.svg";

const Content = ({ children }) => {
  const test = [
    {
      image: "",
      price: "200",
      title: "test title",
      description: "test description",
    },
    {
      image: "",
      price: "200",
      title: "test title",
      description: "test description",
    },
    {
      image: "",
      price: "200",
      title: "test title",
      description: "test description",
    },
    {
      image: "",
      price: "200",
      title: "test title",
      description: "test description",
    },
    {
      image: "",
      price: "200",
      title: "test title",
      description: "test description",
    },
    {
      image: "",
      price: "200",
      title: "test title",
      description: "test description",
    },
  ];
  // useEffect(() => {
  //    fetch("https://fakestoreapi.com/products")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       console.log(json);
  //       setTest(json);
  //     });
  // }, []);
  return (
    <div className="w-full bg-divided p-5 flex items-center gap-4 flex-wrap">
      <div className="w-full bg-white h-[30px] p-5 flex flex-row gap-2 justify-start items-center cursor-pointer rounded-lg">
        <SortIcon />
        <span className="text-sm text-dark">Sort by price</span>
      </div>
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
