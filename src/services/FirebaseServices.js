import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import app from "./FirebaseInitializeServices";

class FirebaseService {
  db;
  storage;
  constructor() {
    this.db = getFirestore(app);
    this.storage = getStorage(app);
  }
}
export default FirebaseService;
