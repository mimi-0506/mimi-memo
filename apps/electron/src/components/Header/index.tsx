import styled from "@emotion/styled";
import CloseIcon from "@/assets/close.svg?react";
import { useAtomValue } from "jotai";
import { colorAtom } from "../../atoms/uiAtom";

const HeaderLayout = styled.header<{ color: string }>`
  -webkit-app-region: drag;
  width: 100%;
  height: 30px;
  background-color: ${({ color }) => color};
  margin-bottom: 20px;
  position: absolute;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  box-sizing: border-box;
  padding: 10px;
  z-index: 9999;
`;

const CloseButton = styled.button`
  width: 15x;
  height: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Header() {
  const { mainColor } = useAtomValue(colorAtom);
  const handleClose = () => {
    window.electron?.ipcRenderer?.send("app-close");
  };

  return (
    <HeaderLayout color={mainColor}>
      <CloseButton onClick={handleClose}>
        <CloseIcon width={"inherit"} height={"inherit"} />
      </CloseButton>
    </HeaderLayout>
  );
}
