import { MemoType } from "../../types/types";
import { addDays, isBefore } from "date-fns";

export const utilDateToString = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = dayNames[date.getDay()];
  return `${month}/${day} ${dayName}`;
};

export const utilStringToDate = (dateString: string) => {
  const [month, day] = dateString.split(" ")[0].split("/").map(Number);
  const currentYear = new Date().getFullYear();
  return new Date(currentYear, month - 1, day);
};

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
