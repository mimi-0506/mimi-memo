import styled from "@emotion/styled";
import TextInput from "./TextInput";
import Tools from "./Tools";
import DaySelector from "./DaySelector";

const TopAreaLayout = styled.div`
  position: sticky;
  width: 100%;
  top: 25px;
  left: 0;
  z-index: 10;

  padding: 10px;

  backdrop-filter: blur(2px);
  border-radius: 10px;
  box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.6);
`;

const ButtonArea = styled.div`
  width: 100%;
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
