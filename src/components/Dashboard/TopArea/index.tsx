import styled from "@emotion/styled";
import DaySelector from "./DaySelector";
import TextInput from "./TextInput";
import Tools from "./Tools";

const TopAreaLayout = styled.div`
  position: sticky;
  width: 100%;
  top: 20px;
  left: 0;
  z-inde: 10;
  background: rgba(255, 255, 255, 0);
  backdrop-filter: blur(3px);
  border-bottom: 1px solid #eee;
  padding: 10px;
`;

const ButtonArea = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function TopArea() {
  return (
    <TopAreaLayout>
      <ButtonArea>
        <DaySelector />
        <Tools />
      </ButtonArea>
      <TextInput />
    </TopAreaLayout>
  );
}
