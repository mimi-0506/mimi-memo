import { useAtomValue } from "jotai";
import Dashboard from "./components/Dashboard";
import GlobalStyle from "./GlobalStyle";
import { authAtom } from "./atoms/memoAtom";
import Auth from "./components/Auth";
import Header from "./components/Header";

function App() {
  const auth = useAtomValue(authAtom);

  return (
    <>
      <GlobalStyle />
      <Header />
      {auth ? <Dashboard /> : <Auth />}
    </>
  );
}

export default App;
