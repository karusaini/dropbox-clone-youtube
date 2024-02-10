import {getApp, getApps, initializeApp } from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getStorage } from "firebase/storage"




const firebaseConfig = {
          apiKey: "AIzaSyBYSXmBcSTsNPNhKFd0pd5e9-zNKkIXfBs",
          authDomain: "dropbox-clone-d08ed.firebaseapp.com",
          projectId: "dropbox-clone-d08ed",
          storageBucket: "dropbox-clone-d08ed.appspot.com",
          messagingSenderId: "538987216149",
          appId: "1:538987216149:web:d47459faaaf0337bda7d1c"
        };

        const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
        const db = getFirestore(app)
        const storage = getStorage(app)

        export {db, storage, }