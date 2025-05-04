window.addEventListener("error", (event) => {
  console.error("💥 전역 에러:", event.message);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("💥 처리되지 않은 프로미스 에러:", event.reason);
});

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
