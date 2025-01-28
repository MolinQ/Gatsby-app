import FirebaseService from "./FirebaseServices";
import {
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
  startAfter,
  limit,
} from "@firebase/firestore";
import { COLLECTIONS_NAMES } from "../constants/fbColectionsNames";
import { formatDate } from "../helpers/formatDate";
import { deleteObject } from "@firebase/storage";
import { getStorage, ref } from "firebase/storage";
import app from "./FirebaseInitializeServices";
import { MAX_PRODUCT_CARD } from "../constants/maxProductCount";

class ProductServices extends FirebaseService {
  constructor() {
    super();
    this.collectionProductRef = collection(this.db, COLLECTIONS_NAMES.PRODUCTS);
    this.collectionCommentsRef = collection(
      this.db,
      COLLECTIONS_NAMES.COMMENTS,
    );
  }
  async createNewProduct(product, productUid, ownerUid, displayName) {
    return await setDoc(doc(this.collectionProductRef, productUid), {
      productUid: productUid,
      title: product.title,
      description: product.description,
      brand: product.brand,
      price: Number(product.price),
      height: product.height,
      width: product.width,
      ram: product.ram,
      ownerUid: ownerUid,
      ownerName: displayName,
    });
  }

  async setProductPhoto(config, uid) {
    return await setDoc(doc(this.db, COLLECTIONS_NAMES.FILES, uid), {
      ...config,
    });
  }
  async getAllProducts(searchText, offset, productLimit) {
    let productQuarry = query(
      this.collectionProductRef,
      limit(productLimit || MAX_PRODUCT_CARD),
      orderBy("productUid"),
      startAfter(offset),
    );
    if (searchText) {
      productQuarry = query(
        productQuarry,
        where("title", ">=", searchText),
        where("title", "<=", searchText + "\uf8ff"),
      );
    }

    const products = await getDocs(productQuarry);

    return products.docs.map((doc) => doc.data());
  }

  async getUserProducts(userUid, searchText, offset, productLimit) {
    let queryProduct = query(
      this.collectionProductRef,
      where("ownerUid", "==", userUid),
      orderBy("productUid"),
      startAfter(offset),
      limit(productLimit),
    );
    if (searchText) {
      queryProduct = query(
        queryProduct,
        where("title", ">=", searchText),
        where("title", "<=", searchText + "\uf8ff"),
      );
    }
    const products = await getDocs(queryProduct);

    return products.docs.map((doc) => {
      return doc.data();
    });
  }

  async getProductCount(searchText) {
    let queryProduct = query(this.collectionProductRef);
    if (searchText) {
      queryProduct = query(
        queryProduct,
        where("title", ">=", searchText),
        where("title", "<=", searchText + "\uf8ff"),
      );
    }
    const boardsCounter = await getCountFromServer(queryProduct);

    return boardsCounter.data().count;
  }

  async getUserProductCount(userUid, searchText) {
    let queryProduct = query(
      this.collectionProductRef,
      orderBy("ownerUid"),
      where("ownerUid", "==", userUid),
    );
    if (searchText) {
      queryProduct = query(
        queryProduct,
        where("title", ">=", searchText),
        where("title", "<=", searchText + "\uf8ff"),
      );
    }
    const boardsCounter = await getCountFromServer(queryProduct);

    return boardsCounter.data().count;
  }

  async getProductByUid(uid) {
    const queryBoards = query(
      this.collectionProductRef,
      where("productUid", "==", uid),
    );
    const products = await getDocs(queryBoards);

    return products.docs.map((doc) => {
      return doc.data();
    });
  }

  async setComments(ownerUid, config, productUid, commentUid, displayName) {
    return await setDoc(doc(this.db, COLLECTIONS_NAMES.COMMENTS, commentUid), {
      date: formatDate(new Date()),
      comment: config.comment,
      logOwnerUid: ownerUid,
      productUid: productUid,
      fullName: displayName,
      commentUid: commentUid,
    });
  }
  async getCommentsBytProductUid(productUid) {
    const commentsRef = collection(this.db, COLLECTIONS_NAMES.COMMENTS);
    const q = query(commentsRef, where("productUid", "==", productUid));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  }

  async deleteProduct(productUid) {
    const currentDoc = doc(this.db, COLLECTIONS_NAMES.PRODUCTS, productUid);
    await deleteDoc(currentDoc);
  }

  async deleteImg(filePath) {
    const imageRef = ref(getStorage(app), filePath);
    await deleteObject(imageRef);
  }
  async deleteImgCollection(imageUid) {
    const currentDoc = doc(this.db, COLLECTIONS_NAMES.FILES, imageUid);
    await deleteDoc(currentDoc);
  }
}

export default ProductServices;
