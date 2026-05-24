import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyDxtF9dqkOf173lwn2b7ZhyR8x8rqnPFTI",
  authDomain: "museuquelora.firebaseapp.com",
  projectId: "museuquelora",
  storageBucket: "museuquelora.firebasestorage.app",
  messagingSenderId: "121419222584",
  appId: "1:121419222584:web:ea58934aa9388f9ed420cd"
}

export const app = initializeApp(firebaseConfig)
