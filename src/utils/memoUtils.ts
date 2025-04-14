import { MemoType } from "../../types/types";

/**
 * 메모 배열을 체크/중요도/텍스트 기준으로 정렬합니다.
 *
 * @param memos - 정렬할 메모 배열
 * @returns 정렬된 메모 배열
 * @example
 * sortMemos([{ text: 'a', checked: false, important: true }, ...])
 */
export const sortMemos = (memos: MemoType[]) => {
  return memos.sort((a, b) => {
    if (a.checked !== b.checked) return a.checked ? 1 : -1;
    if (a.important !== b.important) return a.important ? -1 : 1;
    return a.text.localeCompare(b.text, "ko");
  });
};

/**
 * 기존 메모 맵에서 특정 날짜의 메모 배열을 업데이트하여 새로운 맵을 반환합니다.
 *
 * @param map - 기존 메모 Map
 * @param date - 수정할 메모 배열의 날짜 키
 * @param updater - 기존 메모 배열을 받아 수정된 배열을 반환하는 함수
 * @returns 업데이트된 Map 객체
 * @example
 * updateMemoMap(memoMap, '04/14', (prev) => [...prev, newMemo])
 */
export const updateMemoMap = (
  map: Map<string, MemoType[]>,
  date: string,
  updater: (prev: MemoType[]) => MemoType[]
): Map<string, MemoType[]> => {
  const updated = new Map(map);
  const list = [...(map.get(date) ?? [])];
  updated.set(date, sortMemos(updater(list)));
  return updated;
};

/**
 * 특정 날짜를 기준으로 앞뒤로 비어있는 날짜 배열을 탐색하며 모두 삭제합니다.
 *
 * @param map - 기존 메모 Map
 * @param startDate - 기준 날짜 문자열
 * @returns 새로운 Map (불필요한 빈 날짜 제거 포함)
 */
export const deleteEmptyDatesCascade = (
  map: Map<string, MemoType[]>,
  startDate: string
): Map<string, MemoType[]> => {
  const newMap = new Map(map);
  const dates = Array.from(newMap.keys()).sort();
  const index = dates.indexOf(startDate);

  if (index === -1) return map;
  if ((newMap.get(startDate)?.length ?? 0) > 0) return map;

  const isEmpty = (date: string) => (newMap.get(date)?.length ?? 0) === 0;

  // 앞으로 삭제
  let forward = index;
  while (forward < dates.length && isEmpty(dates[forward])) {
    newMap.delete(dates[forward]);
    forward++;
  }

  // 뒤로 삭제
  let backward = index - 1;
  while (backward >= 0 && isEmpty(dates[backward])) {
    newMap.delete(dates[backward]);
    backward--;
  }

  return newMap;
};
