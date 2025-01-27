import { ref, uploadBytes } from "firebase/storage";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { getDownloadURL } from "@firebase/storage";
import FirebaseService from "./FirebaseServices";
import { COLLECTIONS_NAMES } from "../constants/fbColectionsNames";

class FileService extends FirebaseService {
  constructor() {
    super();
    this.collectionTaskFilesRef = collection(this.db, COLLECTIONS_NAMES.FILES);
  }

  async upload(file, storagePath) {
    const storageRef = ref(this.storage, storagePath);
    return await uploadBytes(storageRef, file);
  }

  async getFile(storagePath) {
    const storageRef = ref(this.storage, storagePath);
    return await getDownloadURL(storageRef);
  }

  async getFilesUid(productUid) {
    const taskFilesQuery = query(
      this.collectionTaskFilesRef,
      where("uid", "==", productUid),
      orderBy("uid"),
    );
    const docRef = await getDocs(taskFilesQuery);
    return docRef.docs.map((doc) => doc.id);
  }
}

export default FileService;
