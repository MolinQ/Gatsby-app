import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import app from "./FirebaseInitializeServices";


class AuthService {
  auth;
  provider;
  userService;
  localStorageService;
  constructor() {
    this.auth = getAuth(app);
    this.provider = new GoogleAuthProvider();

  }
  async singInWithGoogle() {
    return await signInWithPopup(this.auth, this.provider);
  }

  // static logOut() {
  //   LocalStorageService.clearAll();
  //   Cookies.remove(ACCESS_TOKEN);
  // }
}

export default AuthService;
