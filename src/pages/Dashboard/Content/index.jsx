import React, { useCallback, useEffect, useMemo, useState } from "react";
import ProductCard from "../../../components/ui/ProductCard";
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
import { handleProductDeletion } from "../../../helpers/deleteProduct";
import { useLocation } from "@gatsbyjs/reach-router";
import LocalStorageServices from "../../../services/StorageServices";
import { SESSION_KEY } from "../../../constants/localStorageKeys";
import { SORT_TYPE } from "../../../constants/sortingType";
import Loader from "../../../components/Loader";
import { MAX_PRODUCT_CARD } from "../../../constants/maxProductCount";
import useQuarryStore from "../../../stores/quarryStore";
import { CreateProductWithImage } from "../../../helpers/createProductWithImage";
import SortButton from "../../../components/SortButton";
import ToastEmitter from "../../../services/ToastEmmiter";
import { DELETE_PRODUCT_SUCCESS } from "../../../constants/submitMessages";
import { useDebounce } from "use-debounce";
const Content = () => {
  const [products, setProducts] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteProduct, setIsDeleteProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const sessionInfo = JSON.parse(LocalStorageServices.getItem(SESSION_KEY));
  const [productCount, setProductCount] = useState(0);
  const { pathname } = location;
  const { searchText } = useQuarryStore();
  const [debounceText] = useDebounce(searchText, 400);
  const { setUid } = useProductUidStore();
  const [order, setOrder] = useState(SORT_TYPE.ASK);
  const [lastItem, setLastItem] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);

  const fetchData = useCallback(
    async (reset = false) => {
      try {
        setLoading(true);
        let response;
        if (pathname === PAGE_PATH.MY_PRODUCTS) {
          const { uid } = sessionInfo;
          response = await fetchUserProducts(
            uid,
            debounceText,
            reset ? "" : lastItem,
            MAX_PRODUCT_CARD,
          );
          setProductCount(await fetchUserProductCount(uid, debounceText));
        } else {
          response = await fetchProducts(
            debounceText,
            reset ? "" : lastItem,
            MAX_PRODUCT_CARD,
          );
          const count = await fetchProductCount(debounceText);
          setProductCount(count);
        }

        const productsWithImages = await CreateProductWithImage(response);
        if (reset) {
          setProducts(productsWithImages);
        } else {
          setProducts((prev) => [...prev, ...productsWithImages]);
        }
        if (productsWithImages.length > 0) {
          setLastItem(productsWithImages.at(-1)?.productUid || "");
        }
      } finally {
        setLoading(false);
      }
    },
    [pathname, debounceText, sessionInfo, lastItem],
  );

  useEffect(() => {
    setLastItem("");
    fetchData(true);
  }, [debounceText, pathname]);

  const onLoadMore = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const onHandleSorting = () => {
    const sortedProducts = [...products].sort((a, b) => {
      return order === SORT_TYPE.ASK ? a.price - b.price : b.price - a.price;
    });
    setProducts(sortedProducts);
    setOrder((prevDirection) =>
      prevDirection === SORT_TYPE.ASK ? SORT_TYPE.DESK : SORT_TYPE.ASK,
    );
  };

  return (
    <>
      <div className="w-full p-5 flex items-center justify-center gap-4 flex-wrap h-full">
        <div className="w-full bg-white h-[30px] p-5 flex flex-row gap-2 justify-start items-center cursor-pointer rounded-lg">
          <SortButton onHandleSorting={onHandleSorting} />
        </div>
        <div className="flex flex-row justify-end w-full">
          <Button
            onClick={() => navigate(PAGE_PATH.CREATE_PRODUCT)}
            variant={BUTTON_THEM.PRIMARY}
            className="max-w-[120px]"
          >
            Create new
          </Button>
        </div>

        {products.length <= 0 ? (
          <p className="flex justify-center items-center gap-4">
            No one product here{" "}
            {isFirstRender && loading && <Loader size={"size-5"} />}
          </p>
        ) : (
          products.map((item) => (
            <div className="w-full max-w-[350px]" key={item.productUid}>
              <ProductCard
                isDeleteModalOpen={isDeleteModalOpen}
                onOpenDeleteModal={() => setIsDeleteModalOpen(true)}
                onCloseDeleteModal={() => setIsDeleteModalOpen(false)}
                deletionLoading={isDeleteProduct}
                onDeleteProduct={async () => {
                  setIsDeleteProduct(true);
                  await handleProductDeletion(item.productUid);
                  setProducts((prev) =>
                    prev.filter(
                      (product) => product.productUid !== item.productUid,
                    ),
                  );
                  setIsDeleteProduct(false);
                  await fetchData();
                  ToastEmitter.success(DELETE_PRODUCT_SUCCESS);
                  setIsDeleteModalOpen(false);
                }}
                onGoDetails={() => {
                  setUid(item.productUid);
                  navigate(`${PAGE_PATH.DASHBOARD}/${item.productUid}`);
                }}
                {...item}
              />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center p-5">
        {products.length < productCount && products.length > 0 && (
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
