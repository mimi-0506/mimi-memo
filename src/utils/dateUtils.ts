import { MemoType } from "../../types/types";
import { addDays, isBefore } from "date-fns";

/**
 * Date 객체를 'MM/DD 요일' 형식의 문자열로 변환합니다.
 *
 * @param date - 변환할 Date 객체
 * @returns 'MM/DD 요일' 형식의 문자열
 * @example
 * utilDateToString(new Date(2024, 3, 9)) // "04/09 화"
 */
export const utilDateToString = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = dayNames[date.getDay()];
  return `${month}/${day} ${dayName}`;
};

/**
 * 'MM/DD 요일' 형식의 문자열을 현재 연도의 Date 객체로 변환합니다.
 *
 * @param dateString - 'MM/DD 요일' 형식의 문자열 (ex: "04/09 화")
 * @returns 변환된 Date 객체
 * @note 요일 정보는 무시되며, MM과 DD만 사용됩니다.
 */
export const utilStringToDate = (dateString: string) => {
  const [month, day] = dateString.split(" ")[0].split("/").map(Number);
  const currentYear = new Date().getFullYear();
  return new Date(currentYear, month - 1, day);
};

/**
 * 누락된 날짜를 포함하여 모든 날짜에 해당하는 메모 배열을 반환합니다.
 *
 * @param memosMap - 날짜 문자열을 키로 갖는 메모 목록 Map
 * @returns 날짜 문자열과 메모 배열로 이루어진 튜플 리스트
 *
 * @example
 * fillMissingDates(new Map([["04/09 화", [memo1]]]));
 * // -> [["04/09 화", [memo1]], ["04/10 수", []], ["04/11 목", []] ... ]
 *
 * @description
 * - 가장 이른 날짜부터 가장 늦은 날짜까지, 중간에 누락된 날짜도 빈 배열로 채워줍니다.
 * - 메모가 없는 날짜는 빈 배열로 채워짐
 */
export const fillMissingDates = (memosMap: Map<string, MemoType[]>) => {
  if (memosMap.size === 0) return [];

  const sortedDates = Array.from(memosMap.keys())
    .map(utilStringToDate)
    .sort((a, b) => a.getTime() - b.getTime());

  const filledEntries: [string, MemoType[]][] = [];
  let current = sortedDates[0];
  const last = sortedDates[sortedDates.length - 1];

  while (!isBefore(last, current)) {
    const dateStr = utilDateToString(current);
    const memos = memosMap.get(dateStr) ?? [];
    filledEntries.push([dateStr, memos]);
    current = addDays(current, 1);
  }

  return filledEntries;
};

/**
 * MM/DD 형식의 문자열을 현재 연도를 기준으로 한 Date 객체로 변환합니다.
 *
 * @param input - 'MM/DD' 형식의 문자열 (예: '05/06')
 * @returns 변환된 Date 객체 (ex. new Date(2025, 4, 6))
 *
 * @example
 * parseDateText("05/06"); // → new Date(2025, 4, 6)
 *
 * @description
 * - 숫자가 아닌 값이 포함되어 있거나 형식이 잘못되면 예외를 throw합니다.
 */
export const parseDateText = (input: string): Date => {
  try {
    const [month, day] = input.split("/").map(Number);

    const now = new Date();
    const year = now.getFullYear();

    const date = new Date(year, month - 1, day);

    return date;
  } catch (err) {
    console.error("📅 parseDateText 실패:", err);
    throw err;
  }
};
