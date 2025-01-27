import React, { useCallback, useEffect, useMemo, useState } from "react";
import ProductCard from "../../../components/ui/ProductCard";
import { ReactComponent as SortIcon } from "../../../images/sort-svgrepo-com.svg";
import Button from "../../../components/ui/Button";
import { BUTTON_THEM } from "../../../constants/buttonsDependencies";
import { navigate } from "gatsby";
import { PAGE_PATH } from "../../../constants/pagePath";
import {
  fetchProductCount,
  fetchProducts,
  fetchUserProductCount,
  fetchUserProducts,
} from "../../../helpers/fetchProducts";
import useProductUidStore from "../../../stores/selectedProductInfo.jsx";
import FileServices from "../../../services/FileServices";
import { FILE_PATH } from "../../../constants/firebasePath";
import { handleProductDeletion } from "../../../helpers/deleteProduct";
import { useLocation } from "@gatsbyjs/reach-router";
import LocalStorageServices from "../../../services/StorageServices";
import { SESSION_KEY } from "../../../constants/localStorageKeys";
import { SORT_TYPE } from "../../../constants/sortingType";
import Loader from "../../../components/Loader";
import { MAX_PRODUCT_CARD } from "../../../constants/maxProductCount";
import useQuarryStore from "../../../stores/quarryStore";

const fileService = new FileServices();
const Content = () => {
  const [products, setProducts] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const { uid, setUid } = useProductUidStore();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const sessionInfo = JSON.parse(LocalStorageServices.getItem(SESSION_KEY));
  const [productCount, setProductCount] = useState(0);
  const { pathname } = location;
  const { searchText } = useQuarryStore();
  const [order, setOrder] = useState(SORT_TYPE.ASK);

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      const count = await fetchProductCount();
      setProductCount(count);
      const response = await fetchProducts(
        searchText,
        products.at(-1)?.productUid || "",
        MAX_PRODUCT_CARD > productCount
          ? MAX_PRODUCT_CARD
          : productCount - MAX_PRODUCT_CARD,
      );

      const productsWithImages = await Promise.all(
        response.map(async (item) => {
          const photoPath = `${FILE_PATH}/${item.productUid}`;
          const photo = await fileService.getFile(photoPath);
          return { ...item, image: photo };
        }),
      );
      setProducts((prevState) => [...prevState, ...productsWithImages]);
    } finally {
      setLoading(false);
    }
  }, [products, productCount, searchText]);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const { uid } = sessionInfo;
      const count = await fetchUserProductCount(uid);
      setProductCount(count);
      const response = await fetchUserProducts(
        uid,
        searchText,
        products.at(-1)?.productUid || "",
        MAX_PRODUCT_CARD > productCount
          ? MAX_PRODUCT_CARD
          : productCount - MAX_PRODUCT_CARD,
      );
      const productsWithImages = await Promise.all(
        response.map(async (item) => {
          const photoPath = `${FILE_PATH}/${item.productUid}`;
          const photo = await fileService.getFile(photoPath);
          return { ...item, image: photo };
        }),
      );
      setProducts((prevState) => [...prevState, ...productsWithImages]);
    } finally {
      setLoading(false);
    }
  }, [products, productCount, sessionInfo, searchText]);

  const onDeleteProduct = async () => {
    await handleProductDeletion(uid);
    const updatedProducts = products.filter((item) => item.productUid !== uid);
    setProducts(updatedProducts);
    if (pathname === PAGE_PATH.DASHBOARD) {
      const count = await fetchProductCount();
      setProductCount(count);
    } else {
      const count = await fetchUserProductCount(uid);
      setProductCount(count);
    }
    setIsDeleteModalOpen(false);
  };

  const onHandleSorting = () => {
    const sortedProducts = [...products].sort((a, b) => {
      return order === SORT_TYPE.ASK ? a.price - b.price : b.price - a.price;
    });
    setProducts(sortedProducts);
    setOrder((prevDirection) =>
      prevDirection === SORT_TYPE.ASK ? SORT_TYPE.DESK : SORT_TYPE.ASK,
    );
  };

  const onLoadMore = useCallback(async () => {
    if (pathname !== PAGE_PATH.MY_PRODUCTS) {
      await fetchAllData();
    } else {
      await fetchUserData();
    }
  }, [fetchAllData, fetchUserData, pathname, searchText]);
  useEffect(() => {
    if (pathname !== PAGE_PATH.MY_PRODUCTS) {
      fetchAllData();
    } else {
      fetchUserData();
    }
  }, [pathname]);

  const onOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const onCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  return (
    <>
      <div className="w-full p-5 flex items-center justify-center gap-4 flex-wrap h-full">
        <div className="w-full bg-white h-[30px] p-5 flex flex-row gap-2 justify-start items-center cursor-pointer rounded-lg">
          <button onClick={onHandleSorting}>
            <SortIcon />
          </button>
          <span className="text-sm text-dark">Sort by price</span>
        </div>
        <div className="flex flex-row justify-end w-full">
          {pathname !== PAGE_PATH.MY_PRODUCTS && (
            <Button
              onClick={() => navigate(PAGE_PATH.CREATE_PRODUCT)}
              variant={BUTTON_THEM.PRIMARY}
              className="max-w-[120px]"
            >
              Create new
            </Button>
          )}
        </div>
        {products.map((item) => (
          <div className="w-full max-w-[350px]" key={item.productUid}>
            <ProductCard
              onOpenDeleteModal={onOpenDeleteModal}
              onCloseDeleteModal={onCloseDeleteModal}
              isDeleteModalOpen={isDeleteModalOpen}
              onDeleteProduct={onDeleteProduct}
              onGoDetails={() => {
                setUid(item.productUid);
                navigate(`${PAGE_PATH.DASHBOARD}/${item.productUid}`);
              }}
              productUid={item.productUid}
              image={item.image}
              price={item.price}
              title={item.title}
              description={item.description}
            ></ProductCard>
          </div>
        ))}
      </div>
      <div className="flex justify-center p-5">
        {products.length !== productCount && products.length > 0 && (
          <p
            onClick={onLoadMore}
            className="text-baseRegular cursor-pointer text-accent flex gap-2 items-center"
          >
            Load more
            {loading && <Loader size="w-4" />}
          </p>
        )}
      </div>
    </>
  );
};

export default Content;
