import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useSetAtom } from "jotai";
import { authAtom } from "../atoms/memoAtom";
import { AuthType } from "../types/types";

export default function useAuth() {
  const setAuth = useSetAtom(authAtom);

  const googleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user: AuthType | null = result.user;
      console.log("✅ Google 로그인 성공", user);
      setAuth(user);
    } catch (error) {
      console.error("❌ Google 로그인 실패", error);
      throw error;
    }
  };

  return { googleLogin };
}
