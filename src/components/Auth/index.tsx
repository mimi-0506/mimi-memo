import styled from "@emotion/styled";
import useOpenExternal from "../../hook/useOpenExternal";
import useAuth from "../../hook/useAuth";
import { useState } from "react";

const Container = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 32px;
  border-radius: 12px;
  background-color: #f8f8f8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #ccc;
  border-top: 3px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function Auth() {
  const { deployGoogleLogin } = useOpenExternal();
  const { localGoogleLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLoginClick = () => {
    setIsLoading(true);
    if (import.meta.env.MODE === "development") localGoogleLogin();
    else deployGoogleLogin();
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <button onClick={handleGoogleLoginClick}>Google로 로그인</button>
      )}
    </Container>
  );
}
