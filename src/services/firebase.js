import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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

export async function getSuggestedProfiles(userId, following) {
  const coll = collection(db, "users");

  const q = query(coll, limit(10));
  const result = await getDocs(q);
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

// updateLoggedInUserFollowing , updateFollowedUserFollowing

export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) {
  const userDoc = doc(db, "users", loggedInUserDocId);
  const newField = {
    following: isFollowingProfile
      ? arrayRemove(profileId)
      : arrayUnion(profileId),
  };
  await updateDoc(userDoc, newField);
}
export async function updateFollowedUserFollowers(
  profileDocId,
  loggedInUserDocId,
  isFollowingProfile
) {
  const userDoc = doc(db, "users", profileDocId);
  const newField = {
    followers: isFollowingProfile
      ? arrayRemove(loggedInUserDocId)
      : arrayUnion(loggedInUserDocId),
  };
  await updateDoc(userDoc, newField);
}
