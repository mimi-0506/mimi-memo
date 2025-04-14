import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { memosAtom } from "../atoms/memoAtom";
import { utilDateToString } from "../utils/dateUtils";
/**
 * 오늘 날짜에 해당하는 요소로 렌더링 완료 후 자동 스크롤하는 훅
 */
export const useScrollToToday = () => {
  const memos = useAtomValue(memosAtom);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    const today = utilDateToString(new Date());
    const hasToday = memos.has(today);
    if (memos.size && hasToday && !hasScrolledRef.current) {
      setTimeout(() => {
        const todayEl = document.querySelector('[data-today="true"]');
        todayEl?.scrollIntoView({ behavior: "smooth", block: "start" });
        hasScrolledRef.current = true;
      }, 0);
    }
  }, [memos]);
};
