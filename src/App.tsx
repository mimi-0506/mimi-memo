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
