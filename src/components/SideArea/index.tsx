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
  z-index: 999;

  display: flex;
  justify-content: start;
  flex-direction: column;
  gap: 10px;
  width: 30px;
`;

const IndexTitle = styled.h3`
  font-size: 10px;
  background: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SideArea() {
  useLoadIndexes();
  const indexedMap = useAtomValue(indexedMemosAtom);
  const [indexedState, setIndexedState] = useAtom(indexedStateAtom);

  return (
    <IndexGroup>
      {Array.from(indexedMap.keys()).map((data) => (
        <IndexTitle
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
