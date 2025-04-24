import { doc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * 사용자의 latest 경로를 반환
 * @param userId Firebase Auth의 uid
 * @param path 경로 이름
 */
export function getLatestDocRef(userId: string, path: string) {
  return doc(db, "users", userId, path, "latest");
}
