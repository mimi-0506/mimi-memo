import { useAtom, useAtomValue } from "jotai";
import useLoadIndexes from "../../hook/useLoadIndexes";

import styled from "@emotion/styled";
import {
  indexedMemosAtom,
  indexedStateAtom,
} from "../../atoms/indexedMemoAtom";

const IndexGroup = styled.div`
  height: 80vh;
  position: relative;
  right: 5px;

  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 10px;
  width: 30px;
  z-index: 1;
`;

const IndexTitle = styled.h3<{ active: boolean }>`
  font-size: 10px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 35px;
  left: ${({ active }) => (active ? "5px" : "0px")};
  transition: left 0.2s ease;
`;

export default function SideArea() {
  useLoadIndexes();
  const indexedMap = useAtomValue(indexedMemosAtom);
  const [indexedState, setIndexedState] = useAtom(indexedStateAtom);

  return (
    <IndexGroup>
      {Array.from(indexedMap.keys()).map((data) => (
        <IndexTitle
          active={indexedState === data}
          onClick={() => {
            if (indexedState !== data) setIndexedState(data);
            else setIndexedState(null);
          }}
        >
          {data}
        </IndexTitle>
      ))}
    </IndexGroup>
  );
}
