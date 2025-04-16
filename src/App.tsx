import { useAtomValue } from "jotai";
import Dashboard from "./components/Dashboard";
import GlobalStyle from "./GlobalStyle";
import { authAtom } from "./atoms/memoAtom";
import Auth from "./components/Auth";
import Header from "./components/Header";
import styled from "@emotion/styled";
import ResizeHandle from "./components/Hitbox";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  position: relative;
  overflow: hidden;

  height: 90vh;
  width: 90vw;
  background: rgba(255, 255, 255, 0.7);

  border-radius: 20px;
  box-shadow: 0 4px 15px 0 rgba(31, 38, 135, 0.8);
`;

function App() {
  const auth = useAtomValue(authAtom);

  return (
    <>
      <GlobalStyle />
      <ResizeHandle direction="right" />
      <ResizeHandle direction="bottom" />
      <Wrapper>
        <Header />
        {auth ? <Dashboard /> : <Auth />}
      </Wrapper>
    </>
  );
}

export default App;
