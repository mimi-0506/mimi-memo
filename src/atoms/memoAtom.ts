import { atom } from "jotai";
import { MemoType } from "../types";
import { getFormattedDate } from "../utils/dateUtils";

export const memosAtom = atom<MemoType[]>([]);
const today = new Date();
export const dateAtom = atom<string>(getFormattedDate(today));
