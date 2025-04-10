import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const Container = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 32px;
  border-radius: 12px;
  background-color: #f8f8f8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export default function Auth() {
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
      console.log(window.electron);
      window.electron.openExternal("https://mimi-auth.vercel.app/");
    }
  };

  return (
    <Container>
      <button onClick={handleGoogleLogin}>Google로 로그인</button>
    </Container>
  );
}
