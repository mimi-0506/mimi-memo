import { MemoType } from "../../types/types";

export const sortMemos = (memos: MemoType[]) => {
  return memos.sort((a, b) => {
    if (a.checked !== b.checked) return a.checked ? 1 : -1;
    if (a.important !== b.important) return a.important ? -1 : 1;
    return a.text.localeCompare(b.text, "ko");
  });
};
