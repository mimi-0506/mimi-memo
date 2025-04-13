import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
} from "firebase/auth";
import { useSetAtom } from "jotai";
import { authAtom } from "../atoms/memoAtom";
import { useEffect } from "react";
import { AuthType } from "../../types/types";

export default function useAuth() {
  const setAuth = useSetAtom(authAtom);

  const applyToken = async (token: string) => {
    const auth = getAuth();

    //세션 등록
    const credential = GoogleAuthProvider.credential(token);
    const userCredential = await signInWithCredential(auth, credential);
    const userInfo = userCredential.user;

    if (!userInfo) {
      console.error("❌ 사용자 정보 없음");
      return;
    }

    setAuth({
      uid: userInfo.uid,
      email: userInfo?.email,
    });
  };

  useEffect(() => {
    if (window.electron?.onAuthToken) {
      window.electron.onAuthToken((token: string) => {
        alert(`토큰 받기 성공`);
        applyToken(token);
      });
    }
  }, []);

  const localGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user: AuthType | null = result.user;
      console.log("✅ Google 로그인 성공");
      setAuth(user);
    } catch (error) {
      console.error("❌ Google 로그인 실패", error);
      throw error;
    }
  };

  return { localGoogleLogin };
}
