import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../configs/firebase";

export async function doesUsernameExist(username) {
  const coll = collection(db, "users");
  const q = query(coll, where("username", "==", username));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((user) => user.data().length > 0);
}

export async function getUserByUserId(userId) {
  const coll = collection(db, "users");
  const q = query(coll, where("userId", "==", userId));

  const querySnapshot = await getDocs(q);

  const user = querySnapshot.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user;
}
