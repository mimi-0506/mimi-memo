import { atom } from "jotai";
import { AuthType, MemoType } from "../../types/types";
import { utilDateToString } from "../utils/dateUtils";
import { sortMemos } from "../utils/memoUtils";

// ✅ 1. 상태 저장 atom
export const baseMemosAtom = atom<Map<string, MemoType[]>>(new Map());

// ✅ 2. 읽기 전용 atom
export const memosAtom = atom((get) => get(baseMemosAtom));

// ✅ 3. 메모 추가 atom
export const addMemoAtom = atom(null, (get, set, newMemo: MemoType) => {
  const prev = new Map(get(baseMemosAtom));
  const memos = [...(prev.get(newMemo.date) ?? [])];
  memos.push(newMemo);
  prev.set(newMemo.date, sortMemos(memos));
  set(baseMemosAtom, prev);
});

// ✅ 4. 메모 수정 atom
export const editMemoAtom = atom(null, (get, set, updatedMemo: MemoType) => {
  const prev = new Map(get(baseMemosAtom));
  const memos = [...(prev.get(updatedMemo.date) ?? [])];
  const idx = memos.findIndex((m) => m.id === updatedMemo.id);
  if (idx === -1) return;
  memos[idx] = updatedMemo;
  prev.set(updatedMemo.date, sortMemos(memos));
  set(baseMemosAtom, prev);
});

// ✅ 5. 체크 토글 액션 atom
export const toggleCheckedAtom = atom(null, (get, set, target: MemoType) => {
  const updated = { ...target, checked: !target.checked };
  const prev = new Map(get(baseMemosAtom));
  const memos = [...(prev.get(updated.date) ?? [])];
  const idx = memos.findIndex((m) => m.id === updated.id);
  if (idx === -1) return;
  memos[idx] = updated;
  prev.set(updated.date, sortMemos(memos));
  set(baseMemosAtom, prev);
});

// ✅ 6. 메모 삭제 액션 atom
export const deleteMemoAtom = atom(null, (get, set, target: MemoType) => {
  const prev = new Map(get(baseMemosAtom));
  const memos = [...(prev.get(target.date) ?? [])];
  const updated = memos.filter((m) => m.id !== target.id);
  prev.set(target.date, updated);
  set(baseMemosAtom, prev);
});

// ✅ 9. 전체 초기화 액션 atom
export const clearAllMemosAtom = atom(null, (_get, set) => {
  set(baseMemosAtom, new Map());
});

// ✅ 10. 초기 데이터 불러오기 atom
export const loadMemosAtom = atom(
  null,
  (_get, set, map: Map<string, MemoType[]>) => {
    set(baseMemosAtom, map);
  }
);

// ✅ 날짜 선택 상태 atom
export const dateAtom = atom<string>(utilDateToString(new Date()));

// ✅ 사용자 인증 상태 atom
export const authAtom = atom<AuthType | null>(null);
