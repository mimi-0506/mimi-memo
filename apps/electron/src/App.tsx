import { useAtomValue } from "jotai";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import GlobalStyle from "./GlobalStyle";
import { authAtom } from "./atoms/memoAtom";
import ResizeHitbox from "./components/ResizeHitbox";
import SideArea from "./components/SideArea";
import styled from "@emotion/styled";

const RootLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  position: relative;

  width: 100vw;
  height: 100vh;
`;

const AppWindow = styled.main`
  display: flex;
  flex-direction: column;
  align-items: top;
  justify-content: start;
  position: relative;
  z-index: 2;

  height: 90vh;
  width: 86vw;
  margin-left: 5px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  box-shadow: 0 4px 15px 0 rgba(31, 38, 135, 0.8);
  overflow: hidden;
`;

export default function App() {
  const auth = useAtomValue(authAtom);

  return (
    <>
      <GlobalStyle />

      <RootLayout>
        <ResizeHitbox direction="right" />
        <ResizeHitbox direction="bottom" />
        <AppWindow>
          <Header />
          {auth ? <Dashboard /> : <Auth />}
        </AppWindow>
        <SideArea />
      </RootLayout>
    </>
  );
}
