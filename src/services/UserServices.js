// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   limit,
//   orderBy,
//   query,
//   setDoc,
//   where,
// } from "@firebase/firestore";
// import {COLLECTIONS_NAMES} from "../constants/fbCollectionsName";
// import FirebaseService from "./FirebaseServices";
//
// class UserService extends FirebaseService {
//   collectionUserRef;
//   collectionBoardsRef;
//   constructor() {
//     super();
//     this.collectionUserRef = collection(this.db, COLLECTIONS_NAMES.USERS);
//     this.collectionBoardsRef = collection(this.db, COLLECTIONS_NAMES.BOARDS);
//   }
//
//   async saveAdditionalUserData(config, uid, imageURL) {
//     const { firstName, lastName, email, phoneNumber, photoUrl } = config;
//     await setDoc(doc(this.db, COLLECTIONS_NAMES.USERS, uid), {
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       phoneNumber: phoneNumber,
//       photo: imageURL || photoUrl,
//       uid: uid,
//     });
//   }
//
//   async saveAdditionalUserGoogleData(config, uid) {
//     await setDoc(doc(this.db, COLLECTIONS_NAMES.USERS, uid), { ...config });
//   }
//
//   // async getUser(uId) {
//   //   const docRef = doc(this.collectionUserRef, uId);
//   //   const docSnap = await getDoc(docRef);
//   //
//   //   if (docSnap.exists()) {
//   //     return docSnap.data();
//   //   } else {
//   //     return null;
//   //   }
//   // }
//
//   // async getAllUsers() {
//   //   const userQuery = query(this.collectionUserRef, limit(LIMIT_USERS_FETCH));
//   //
//   //   const docRef = await getDocs(userQuery);
//   //   return docRef.docs.map((doc) => ({
//   //     id: doc.id,
//   //     ...doc.data(),
//   //   }));
//   // }
// }
//
// export default UserService;
