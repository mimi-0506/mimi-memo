import { atom } from "jotai";
import { AuthType, MemoType } from "../types/types";
import { utilDateToString } from "../utils/dateUtils";

const baseMemosAtom = atom<Map<string, MemoType[]>>(new Map());
export const memosAtom = atom(
  (get) => get(baseMemosAtom),
  (get, set, update: MemoType | Map<string, MemoType[]>) => {
    if (update instanceof Map) {
      set(baseMemosAtom, update);
    } else {
      const prevMap = new Map(get(baseMemosAtom));
      const memos = prevMap.get(update.date) ?? [];

      const existingIndex = memos.findIndex((m) => m.id === update.id);

      if (existingIndex !== -1) memos[existingIndex] = update;
      else memos.push(update);

      const sorted = memos.sort((a, b) => {
        if (a.checked !== b.checked) return a.checked ? 1 : -1;
        if (a.important !== b.important) return a.important ? -1 : 1;
        return a.text.localeCompare(b.text, "ko");
      });

      prevMap.set(update.date, sorted);
      set(baseMemosAtom, prevMap);
    }
  }
);

export const dateAtom = atom<string>(utilDateToString(new Date()));

export const authAtom = atom<AuthType | null>(null);
