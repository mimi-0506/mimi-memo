import { useAtom, useAtomValue } from "jotai";
import { RefObject, useEffect } from "react";
import { scrollCoordAtom, scrollDateAtom } from "../atoms/memoAtom";

export default function useGetMemoGroupCoord(
  date: string,
  ref: RefObject<HTMLDivElement | null>
) {
  const scrollDate = useAtomValue(scrollDateAtom);
  const [scrollCoord, setScrollCoord] = useAtom(scrollCoordAtom);

  useEffect(() => {
    if (date === scrollDate) {
      const rect = ref.current!.getBoundingClientRect();
      setScrollCoord(rect);
    }
  }, [scrollDate]);

  useEffect(() => {
    if (date === scrollDate && !scrollCoord && scrollDate) {
      const rect = ref.current!.getBoundingClientRect();
      setScrollCoord(rect);
    }
  }, [scrollCoord]);
}
