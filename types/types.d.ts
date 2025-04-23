export type MemoType = {
  text: string;
  checked: boolean;
  important: boolean;
  date: string;
  id: string;
};

export type IndexedMemoType = {
  index: string;
  text: string;
  id: string;
};

export type MemoDirectoryType = {
  memos: MemoType[];
  date: string;
};

export type IndexedMemoDirectoryType = {
  indexedMemos: IndexedMemoType[];
  index: string;
};

export type AuthType = { uid: string; email: string | null };

export type Direction = "bottom" | "right";
