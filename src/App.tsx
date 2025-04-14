import { useAtomValue } from "jotai";
import Dashboard from "./components/Dashboard";
import GlobalStyle from "./GlobalStyle";
import { authAtom } from "./atoms/memoAtom";
import Auth from "./components/Auth";
import Header from "./components/Header";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  overflow: hidden;

  height: 90vh;
  width: 90vw;

  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.7);

  border-radius: 20px;
  box-shadow: 0 4px 15px 0 rgba(31, 38, 135, 0.8);
`;

function App() {
  const auth = useAtomValue(authAtom);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header />
        {auth ? <Dashboard /> : <Auth />}
      </Wrapper>
    </>
  );
}

export default App;
