import { useRef } from "react";
import { DateDisplay, HiddenInput, SelectorWrapper } from "./styles";
import { getFormattedDate } from "../../utils/dateUtils";
import { useAtom } from "jotai";
import { dateAtom } from "../../atoms/memoAtom";

export default function DaySelector() {
  const [date, setDate] = useAtom(dateAtom);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.showPicker();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setDate(getFormattedDate(selectedDate));
  };

  return (
    <SelectorWrapper>
      <DateDisplay onClick={handleClick}>{date}</DateDisplay>
      <HiddenInput ref={inputRef} type="date" onChange={handleChange} />
    </SelectorWrapper>
  );
}
