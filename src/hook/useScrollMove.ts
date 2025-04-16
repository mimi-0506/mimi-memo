import { useAtomValue, useSetAtom } from "jotai";
import { scrollCoordAtom, scrollDateAtom } from "../atoms/memoAtom";
import { RefObject, useEffect } from "react";
import { utilDateToString } from "../utils/dateUtils";

export default function useScrollMove(
  wrapperRef: RefObject<HTMLDivElement | null>
) {
  const scrollCoord = useAtomValue(scrollCoordAtom);
  const setScrollDate = useSetAtom(scrollDateAtom);

  useEffect(() => {
    const today = utilDateToString(new Date());
    setScrollDate(today);
  }, []);

  useEffect(() => {
    if (scrollCoord) {
      setTimeout(() => {
        wrapperRef.current!.scrollTo({
          top: scrollCoord.top - 250,
          behavior: "smooth",
        });
      }, 0);
    }
  }, [scrollCoord]);
}
