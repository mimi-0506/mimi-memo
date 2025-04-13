import styled from "@emotion/styled";
``;
import useOpenExternal from "../../hook/useOpenExternal";
import useAuth from "../../hook/useAuth";

const Container = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 32px;
  border-radius: 12px;
  background-color: #f8f8f8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export default function Auth() {
  const { deployGoogleLogin } = useOpenExternal();
  const { localGoogleLogin } = useAuth();

  const handleGoogleLoginClick = () => {
    //렌더러에서 메인 env를 꺼내다 쓰려면 이렇게 해야 함
    if (import.meta.env.MODE === "development") localGoogleLogin();
    else deployGoogleLogin();
  };

  return (
    <Container>
      <button onClick={handleGoogleLoginClick}>Google로 로그인</button>
    </Container>
  );
}
