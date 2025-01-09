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

// yyyy-MM-dd hh:mm:ss 형식으로 변환하는 유틸리티 함수
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

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
  const user = auth.currentUser;
  const post = {
    ...contents,
    id,
    date: formatDate(new Date()), // 작성일을 yyyy-MM-dd hh:mm:ss 형식으로 저장
    user: {
      name: user.displayName,
      photoURL: user.photoURL,
    },
  };
  try {
    await set(ref(database, `board/${id}`), post);
    console.log("데이터가 성공적으로 추가되었습니다.");
  } 
  catch (error) {
    console.error("데이터 추가 실패:", error);
    throw error;
  }
}

export async function getBoard() {
  try {
    const snapshot = await get(ref(database, 'board'));
    if (snapshot.exists()) {
      const boards = snapshot.val();
      // 데이터가 객체 형태로 반환되므로 배열로 변환
      return Object.values(boards);
    } else {
      console.log("게시판 데이터가 없습니다.");
      return [];
    }
  } catch (error) {
    console.error("게시판 데이터를 가져오는 중 오류 발생:", error);
    throw error;
  }
}
