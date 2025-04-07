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

          overflow: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE & Edge */

          &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }

          margin: 0;
          background: rgba(255, 255, 255, 0.01);
        }

        a {
          color: inherit;
          text-decoration: none;
          -webkit-app-region: no-drag;
        }

        button {
          all: unset;
          cursor: pointer;
          -webkit-app-region: no-drag;
        }

        input {
          -webkit-app-region: no-drag;
        }
      `}
    />
  );
}
