import { atom } from "jotai";
import { MemoType } from "../types";
import { utilDateToString } from "../utils/dateUtils";

const baseMemosAtom = atom<Map<string, MemoType[]>>(new Map());
export const memosAtom = atom(
  (get) => get(baseMemosAtom),
  (get, set, newMemo: MemoType) => {
    const prevMap = new Map(get(baseMemosAtom));
    const memos = prevMap.get(newMemo.date) ?? [];

    const existingIndex = memos.findIndex((m) => m.id === newMemo.id);

    if (existingIndex !== -1) memos[existingIndex] = newMemo;
    else memos.push(newMemo);

    const sorted = memos.sort((a, b) => {
      if (a.checked !== b.checked) return a.checked ? 1 : -1;
      if (a.important !== b.important) return a.important ? -1 : 1;
      return a.text.localeCompare(b.text, "ko");
    });

    prevMap.set(newMemo.date, sorted);
    set(baseMemosAtom, prevMap);
  }
);

export const dateAtom = atom<string>(utilDateToString(new Date()));
