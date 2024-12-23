import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: process.env.GATSBY_DB_API_KEY,
  authDomain: process.env.GATSBY_DB_AUTH_DOMAIN,
  projectId: process.env.GATSBY_DB_PROJECT_ID,
  storageBucket: process.env.GATSBY_DB_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_DB_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_DB_APP_ID,
  measurementId: process.env.GATSBY_DB_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export default app;
