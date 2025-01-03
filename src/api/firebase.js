import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged 
} from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import User from "../components/User";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
let date = new Date();
date = date.toLocaleDateString();

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {

  return get(ref(database, 'admins')).then((snapshot) => {
    if(snapshot.exists()) {
      const admins = snapshot.val();
      // console.log(admins);
      const isAdmin = admins.includes(user.uid);
      return {...user, isAdmin}
    }
    return user;
  });
}

export async function postBoard(contents) {
  const id = uuid();
  set(ref(database, `board/${id}`), {
    ...contents, 
    id,
    price: parseInt(product.price),
    date,
    user: User.displayName,
  });
}
