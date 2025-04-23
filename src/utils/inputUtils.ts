import { parseDateText, utilDateToString } from "./dateUtils";
import { IndexedMemoType, MemoType } from "../../types/types";
import { v4 as uuidv4 } from "uuid";

/**
 * @description
 * '@MMDD 메모' 형식의 입력 문자열에서 날짜와 나머지 텍스트를 추출합니다.
 * 날짜가 유효하지 않거나 존재하지 않으면 fallbackDate를 사용합니다.
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
 * @description
 * '!텍스트' 형식의 입력 문자열에서 중요 여부를 판단하고 느낌표를 제거합니다.
 *
 * @param input - '!중요 메모'
 * @returns 중요 여부와 정제된 텍스트
 * @example
 * extractImportant('!hello') // { text: 'hello', important: true }
 */
export const extractImportant = (
  input: string
): { text: string; important: boolean } => {
  return { text: input.slice(1).trim(), important: true };
};

/**
 * @description
 * '#주제 텍스트' 형식의 입력에서 주제를 인덱스로 분리하고 나머지 텍스트를 추출합니다.
 *
 * @param input - '#finance 투자 관련 메모' 등
 * @returns index와 정제된 텍스트
 * @example
 * extractIndex('#finance 투자 관련 메모') // { index: 'finance', text: '투자 관련 메모' }
 */
export const extractIndex = (input: string) => {
  return {
    index: input.slice(1).trim().split(" ")[0],
    text: input.slice(1).trim(),
  };
};

/**
 * @description
 * 사용자의 입력값을 파싱하여 MemoType 또는 IndexedMemoType 객체를 생성합니다.
 *
 * @param rawInput - 전체 입력 문자열
 * @param fallbackDate - 날짜가 명시되지 않았을 경우 사용할 기본 날짜 문자열
 * @returns MemoType 또는 IndexedMemoType 객체, 혹은 빈 입력일 경우 null
 * @example
 * createMemoFromInput('!@0506 hello', '04/14')
 */
export const createMemoFromInput = (
  rawInput: string,
  fallbackDate: string
): MemoType | IndexedMemoType | null => {
  let input = rawInput.trim();
  if (input === "") return null;

  let returnValue: MemoType | IndexedMemoType = {
    text: input,
    date: fallbackDate,
    checked: false,
    important: false,
    id: uuidv4(),
  };

  if (input.startsWith("!")) {
    const extractedValue = extractImportant(input);
    returnValue = { ...returnValue, ...extractedValue };
  } else if (input.startsWith("@")) {
    const extractedValue = extractDateFromInput(input, fallbackDate);
    returnValue = { ...returnValue, ...extractedValue };
  } else if (input.startsWith("#")) {
    const extractedValue = extractIndex(input);
    returnValue = { id: returnValue.id, ...extractedValue };
  }

  return returnValue;
};
