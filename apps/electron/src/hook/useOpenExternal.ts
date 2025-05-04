import { useEffect, useState } from "react";
export default function useOpenExternal() {
  const [canOpenExternal, setCanOpenExternal] = useState(false);
  useEffect(() => {
    if (
      window &&
      window.electron &&
      typeof window.electron.openExternal === "function"
    )
      setCanOpenExternal(true);
  }, []);

  const deployGoogleLogin = () => {
    if (canOpenExternal)
      window.electron.openExternal("https://mimi-auth.vercel.app/");
  };

  return { deployGoogleLogin };
}
