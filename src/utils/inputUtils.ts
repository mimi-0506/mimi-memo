import { parseDateText, utilDateToString } from "./dateUtils";
import { MemoType } from "../../types/types";
import { v4 as uuidv4 } from "uuid";

/**
 * input이 @MMDD 형식이면 날짜를 추출하고 나머지 텍스트를 반환합니다.
 *
 * @param input - '@0506 메모' 형식의 문자열
 * @param fallbackDate - 날짜가 없을 경우 기본으로 사용할 날짜 문자열 (예: '04/14')
 * @returns 날짜가 반영된 텍스트와 변환된 날짜 문자열
 * @example
 * extractDateFromInput('@0506 hello', '04/14') // { text: 'hello', date: '05/06 월' }
 */
export const extractDateFromInput = (
  input: string,
  fallbackDate: string
): { text: string; date: string } => {
  const match = input.match(/^@(\d{4})\s*(.*)$/);
  if (!match) return { text: input, date: fallbackDate };

  const [, mmdd, rest] = match;
  const month = mmdd.slice(0, 2);
  const day = mmdd.slice(2, 4);
  const parsedDate = utilDateToString(parseDateText(`${month}/${day}`));

  return { text: rest.trim(), date: parsedDate };
};

/**
 * input이 !로 시작하면 중요 메모로 판단하고 느낌표를 제거합니다.
 *
 * @param input - '!중요 메모' 또는 '일반 메모'
 * @returns 중요 여부와 정제된 텍스트
 * @example
 * extractImportant('!hello') // { text: 'hello', important: true }
 */
export const extractImportant = (
  input: string
): { text: string; important: boolean } => {
  if (input.startsWith("!")) {
    return { text: input.slice(1).trim(), important: true };
  }
  return { text: input, important: false };
};

/**
 * 사용자의 입력값을 파싱하여 MemoType 객체를 생성합니다.
 *
 * @param rawInput - 전체 입력 문자열
 * @param fallbackDate - 날짜가 명시되지 않았을 경우 사용할 기본 날짜 문자열
 * @returns MemoType 객체 또는 null (빈 입력 시)
 * @example
 * createMemoFromInput('!@0506 hello', '04/14')
 */
export const createMemoFromInput = (
  rawInput: string,
  fallbackDate: string
): MemoType | null => {
  let input = rawInput.trim();
  if (input === "") return null;

  const { text: withoutBang, important } = extractImportant(input);
  const { text, date } = extractDateFromInput(withoutBang, fallbackDate);

  return {
    text,
    date,
    checked: false,
    important,
    id: uuidv4(),
  };
};
