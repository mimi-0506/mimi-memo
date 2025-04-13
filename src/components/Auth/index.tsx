import styled from "@emotion/styled";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { authAtom } from "../../atoms/memoAtom";

const Container = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 32px;
  border-radius: 12px;
  background-color: #f8f8f8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export default function Auth() {
  const setAuth = useSetAtom(authAtom);
  const [canOpenExternal, setCanOpenExternal] = useState(false);

  useEffect(() => {
    if (
      window &&
      window.electron &&
      typeof window.electron.openExternal === "function"
    )
      setCanOpenExternal(true);
  }, []);

  const handleGoogleLogin = () => {
    if (canOpenExternal) {
      window.electron.openExternal("https://mimi-auth.vercel.app/");
    }
  };

  useEffect(() => {
    const applyToken = async (token: string) => {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${
          import.meta.env.VITE_FIREBASE_API_KEY
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken: token }),
        }
      );

      const data = await res.json();
      const userInfo = data.users?.[0];

      if (!userInfo) {
        console.error("유저 정보를 불러오지 못함");
        return;
      }

      setAuth({
        uid: userInfo.localId,
        email: userInfo.email,
      });
    };

    if (window.electron?.onAuthToken) {
      window.electron.onAuthToken((token: string) => {
        alert(`토큰 받기 성공`);

        applyToken(token);
      });
    }
  }, []);

  return (
    <Container>
      <button onClick={handleGoogleLogin}>Google로 로그인</button>
    </Container>
  );
}
