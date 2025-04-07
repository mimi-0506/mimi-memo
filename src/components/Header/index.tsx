import styled from "@emotion/styled";

export const HeaderLayout = styled.header`
  -webkit-app-region: drag;
  width: 100%;
  height: 30px;
  background-color: pink;
  margin-bottom: 20px;
  position: fixed;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export default function Header() {
  const handleClose = () => {
    window.electron?.ipcRenderer?.send("app-close");
  };

  return (
    <HeaderLayout>
      <button onClick={handleClose}>닫기</button>
    </HeaderLayout>
  );
}
