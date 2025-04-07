import styled from "@emotion/styled";
import useAuth from "../../hook/useAuth";

export default function Auth() {
  const { googleLogin } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      alert("✅ 구글 로그인 성공!");
    } catch (e) {
      alert("❌ 구글 로그인 실패: " + (e as Error).message);
    }
  };

  return (
    <Container>
      <button onClick={handleGoogleLogin}>Google로 로그인</button>
    </Container>
  );
}

const Container = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 32px;
  border-radius: 12px;
  background-color: #f8f8f8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;
