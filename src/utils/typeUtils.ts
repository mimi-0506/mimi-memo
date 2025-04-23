import { MemoType } from "../../types/types";

export function isMemoType(memo: any): memo is MemoType {
  return "date" in memo && "checked" in memo && "important" in memo;
}
