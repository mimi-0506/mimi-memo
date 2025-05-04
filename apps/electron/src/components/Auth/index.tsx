import styled from "@emotion/styled";
import useOpenExternal from "../../hook/useOpenExternal";
import useAuth from "../../hook/useAuth";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 200px;
  height: 50px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid white;
  border-top: 10px solid pink;
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
        <Button onClick={handleGoogleLoginClick}>Google로 로그인</Button>
      )}
    </Container>
  );
}
