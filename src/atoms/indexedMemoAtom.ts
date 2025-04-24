// ✅ Indexed 메모 구조를 위한 상태 저장 atom
import { atom } from "jotai";
import { IndexedMemoType } from "../../types/types";

// ✅ 1. 상태 저장 atom: 인덱스별 메모를 저장하는 Map
export const baseIndexedMemosAtom = atom<Map<string, IndexedMemoType[]>>(
  new Map()
);

// ✅ 2. 읽기 전용 atom
export const indexedMemosAtom = atom((get) => get(baseIndexedMemosAtom));

// ✅ 3. 메모 추가 atom
export const addIndexedMemoAtom = atom(
  null,
  (get, set, newMemo: IndexedMemoType & { index: string }) => {
    const currentMap = get(baseIndexedMemosAtom);
    const index = newMemo.index;

    const updated = new Map(currentMap);
    const prev = updated.get(index) ?? [];
    updated.set(index, [...prev, newMemo]);

    set(baseIndexedMemosAtom, updated);
  }
);

// ✅ 4. 메모 삭제 atom
export const deleteIndexedMemoAtom = atom(
  null,
  (get, set, target: IndexedMemoType & { index: string }) => {
    const currentMap = get(baseIndexedMemosAtom);
    const index = target.index;

    const updated = new Map(currentMap);
    const prev = updated.get(index) ?? [];
    const filtered = prev.filter((m) => m.id !== target.id);

    if (filtered.length === 0) updated.delete(index);
    else updated.set(index, filtered);

    set(baseIndexedMemosAtom, updated);
  }
);

// ✅ 5. 외부에서 초기 데이터 불러오기 atom
export const loadIndexedMemosAtom = atom(
  null,
  (_get, set, map: Map<string, IndexedMemoType[]>) => {
    set(baseIndexedMemosAtom, map);
  }
);

export const indexedStateAtom = atom<string | null>(null);
