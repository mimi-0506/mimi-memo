import { doc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * 사용자의 latest memos 문서 경로를 반환
 * @param userId Firebase Auth의 uid
 */
export function getLatestMemosDocRef(userId: string) {
  return doc(db, "users", userId, "memos", "latest");
}

/**
 * 사용자의 latest bounds 문서 경로를 반환
 * @param userId Firebase Auth의 uid
 */
export function getLatestBoundsDocRef(userId: string) {
  return doc(db, "users", userId, "bounds", "latest");
}
