import styled from "@emotion/styled";

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

export default function Header() {
  const handleClose = () => {
    window.electron?.ipcRenderer?.send("app-close");
  };

  return (
    <HeaderLayout>
      <button onClick={handleClose}>x</button>
    </HeaderLayout>
  );
}
