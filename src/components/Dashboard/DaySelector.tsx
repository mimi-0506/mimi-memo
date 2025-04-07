import { useRef } from "react";
import { utilDateToString } from "../../utils/dateUtils";
import { useAtom } from "jotai";
import { dateAtom } from "../../atoms/memoAtom";
import styled from "@emotion/styled";

export const SelectorWrapper = styled.button`
  margin-bottom: 1rem;
`;

export const DateDisplay = styled.div`
  margin-top: 50px;
  display: inline-block;
  padding: 8px 12px;
  background-color: #eee;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
`;

export const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export default function DaySelector() {
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
      <DateDisplay onClick={handleClick}>{date}</DateDisplay>
      <HiddenInput ref={inputRef} type="date" onChange={handleChange} />
    </SelectorWrapper>
  );
}
