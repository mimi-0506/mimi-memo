import { Global, css } from "@emotion/react";
import reset from "emotion-reset";

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        ${reset}

        *, *::before, *::after {
          box-sizing: border-box;
        }

        html,
        body {
          font-family: "Pretendard", sans-serif;
          background-color: #fff;
          color: #111;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          all: unset;
          cursor: pointer;
        }
      `}
    />
  );
}
