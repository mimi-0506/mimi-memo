import styled from "@emotion/styled";
import CloseIcon from "@/assets/close.svg?react";

const HeaderLayout = styled.header`
  -webkit-app-region: drag;
  width: 100%;
  height: 30px;
  background-color: pink;
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
  const handleClose = () => {
    window.electron?.ipcRenderer?.send("app-close");
  };

  return (
    <HeaderLayout>
      <CloseButton onClick={handleClose}>
        <CloseIcon width={"inherit"} height={"inherit"} />
      </CloseButton>
    </HeaderLayout>
  );
}
