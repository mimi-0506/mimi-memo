import { useAtomValue } from "jotai";
import Dashboard from "./components/Dashboard";
import GlobalStyle from "./GlobalStyle";
import { authAtom } from "./atoms/memoAtom";
import Auth from "./components/Auth";
import Header from "./components/Header";
import styled from "@emotion/styled";
import ResizeHandle from "./components/Hitbox";
import SideArea from "./components/SideArea";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  position: relative;

  width: 100vw;
  height: 100vh;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: top;
  justify-content: start;
  position: relative;

  height: 90vh;
  width: 90vw;
  background: rgba(255, 255, 255, 0.7);

  border-radius: 20px;
  box-shadow: 0 4px 15px 0 rgba(31, 38, 135, 0.8);
  overflow: hidden;
`;

function App() {
  const auth = useAtomValue(authAtom);

  return (
    <>
      <GlobalStyle />

      <Wrapper>
        <ResizeHandle direction="right" />
        <ResizeHandle direction="bottom" />
        <Layout>
          <Header />
          {auth ? <Dashboard /> : <Auth />}
        </Layout>
        <SideArea />
      </Wrapper>
    </>
  );
}

export default App;
