import styled from "@emotion/styled";

export const Wrapper = styled.div`
  padding: 20px;
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  resize: vertical;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
`;

export const MemoList = styled.div`
  margin-top: 20px;
`;

export const MemoItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 8px;
  background-color: #f7f7f7;
  border-radius: 4px;
  border: 1px solid #eee;
`;

export const MemoLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
`;

export const MemoText = styled.span<{ checked: boolean }>`
  color: ${({ checked }) => (checked ? "#999" : "#000")};
  text-decoration: ${({ checked }) => (checked ? "line-through" : "none")};
  white-space: pre-wrap;
`;

export const MemoDate = styled.div`
  font-size: 0.875rem;
  color: #888;
  margin-left: 12px;
  white-space: nowrap;
`;

export const SelectorWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const DateDisplay = styled.div`
  display: inline-block;
  padding: 8px 12px;
  background-color: #eee;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
`;

export const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;
