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
          background: rgba(255, 255, 255, 0);

          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;

          -webkit-user-select: none; /* Chrome, Safari */
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* IE10+/Edge */
          user-select: none; /* 표준 */
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
