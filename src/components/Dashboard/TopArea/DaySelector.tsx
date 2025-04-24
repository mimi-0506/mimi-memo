import { useRef } from "react";
import { utilDateToString } from "../../../utils/dateUtils";
import { useAtom, useAtomValue } from "jotai";
import { dateAtom } from "../../../atoms/memoAtom";
import styled from "@emotion/styled";
import { colorAtom } from "../../../atoms/uiAtom";
import { Overlay } from "../../common";

const SelectorWrapper = styled.button``;

const DateDisplay = styled.div<{ color: string }>`
  display: inline-block;
  position: relative;
  padding: 5px 12px;
  background-color: ${({ color }) => color};
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  overflow: hidden;
`;

const DateText = styled.span`
  position: relative;
  z-index: 2;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export default function DaySelector() {
  const { mainColor } = useAtomValue(colorAtom);
  const [date, setDate] = useAtom(dateAtom);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.showPicker();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setDate(utilDateToString(selectedDate));
  };

  return (
    <SelectorWrapper>
      <DateDisplay onClick={handleClick} color={mainColor}>
        <Overlay />
        <DateText>{date}</DateText>
      </DateDisplay>
      <HiddenInput ref={inputRef} type="date" onChange={handleChange} />
    </SelectorWrapper>
  );
}
