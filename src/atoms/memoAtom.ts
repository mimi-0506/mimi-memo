import { atom } from "jotai";
import { AuthType, MemoType } from "../../types/types";
import { utilDateToString } from "../utils/dateUtils";
import { deleteEmptyDatesCascade, updateMemoMap } from "../utils/memoUtils";

// ✅ 1. 상태 저장 atom
export const baseMemosAtom = atom<Map<string, MemoType[]>>(new Map());

// ✅ 2. 읽기 전용 atom
export const memosAtom = atom((get) => get(baseMemosAtom));

// ✅ 3. 메모 추가 atom
export const addMemoAtom = atom(null, (get, set, newMemo: MemoType) => {
  console.log("addMemo");
  const updated = updateMemoMap(get(baseMemosAtom), newMemo.date, (prev) => [
    ...prev,
    newMemo,
  ]);
  set(baseMemosAtom, updated);
});

// ✅ 4. 메모 수정 atom
export const editMemoAtom = atom(null, (get, set, updatedMemo: MemoType) => {
  const updated = updateMemoMap(
    get(baseMemosAtom),
    updatedMemo.date,
    (prev) => {
      const idx = prev.findIndex((m) => m.id === updatedMemo.id);
      if (idx === -1) return prev;
      const clone = [...prev];
      clone[idx] = updatedMemo;
      return clone;
    }
  );
  set(baseMemosAtom, updated);
});

// ✅ 5. 체크 토글 액션 atom
export const toggleCheckedAtom = atom(null, (get, set, target: MemoType) => {
  const updated = { ...target, checked: !target.checked };
  const result = updateMemoMap(get(baseMemosAtom), updated.date, (prev) => {
    const idx = prev.findIndex((m) => m.id === updated.id);
    if (idx === -1) return prev;
    const clone = [...prev];
    clone[idx] = updated;
    return clone;
  });
  set(baseMemosAtom, result);
});

// ✅ 6. 메모 삭제 액션 atom
export const deleteMemoAtom = atom(null, (get, set, target: MemoType) => {
  const originalMap = get(baseMemosAtom);

  const updatedMap = new Map(originalMap);
  const currentList = updatedMap.get(target.date) ?? [];
  const nextList = currentList.filter((m) => m.id !== target.id);

  updatedMap.set(target.date, nextList);

  // 삭제 후 비어있다면 연쇄 삭제 실행
  const finalMap =
    nextList.length === 0
      ? deleteEmptyDatesCascade(updatedMap, target.date)
      : updatedMap;

  set(baseMemosAtom, finalMap);
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
