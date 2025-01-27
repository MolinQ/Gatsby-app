import React, { useState } from "react";
import "./styles/style.css";
import { PAGE_PATH } from "../../constants/pagePath";

const BurgerMenu = () => {
  const [active, setActive] = useState(false);
  const onActiveBurger = () => {
    setActive((prev) => !prev);
  };
  const links = [
    { name: "Dashboard", path: PAGE_PATH.DASHBOARD },
    { name: "My products", path: PAGE_PATH.MY_PRODUCTS },
    { name: "Logout", path: PAGE_PATH.LOGOUT },
  ];
  return (
    <>
      <button
        onClick={onActiveBurger}
        className={`burger ${active ? "active" : ""}`}
      >
        <span></span>
      </button>
      <div className={`sidebar ${active ? "active" : ""}`}>
        <div className="pt-14 px-5 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.name}
              className="text-white text-h2 focus:opacity-70"
              href={link.path}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
export default BurgerMenu;
