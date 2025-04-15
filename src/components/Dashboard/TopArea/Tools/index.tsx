import styled from "@emotion/styled";
import CleanIcon from "@/assets/clean.svg?react";
import ColorIcon from "@/assets/color.svg?react";
import { useSetAtom } from "jotai";
import { deleteEmptyAtom } from "../../../../atoms/memoAtom";

const ToolLayout = styled.div`
  display: flex;
  gap: 5px;
`;

const Button = styled.button`
  width: 25px;
  height: 25px;
`;

export default function Tools() {
  const deleteEmpty = useSetAtom(deleteEmptyAtom);

  const handleClickMainColorChangeButton = () => {};

  const handleClickDeleteEmptyButton = () => {
    deleteEmpty();
  };

  return (
    <ToolLayout>
      <Button
        onClick={handleClickMainColorChangeButton}
        title="메인 컬러 바꾸기"
      >
        <ColorIcon width="inherit" height="inherit" />
        <input type="color" />
      </Button>
      <Button onClick={handleClickDeleteEmptyButton} title="빈 배열 제거">
        <CleanIcon width="inherit" height="inherit" />
      </Button>
    </ToolLayout>
  );
}
