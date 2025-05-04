import styled from "@emotion/styled";
import CleanIcon from "@/assets/clean.svg?react";
import ColorIcon from "@/assets/color.svg?react";
import { useSetAtom } from "jotai";
import { deleteEmptyAtom } from "../../../../atoms/memoAtom";
import { useRef } from "react";
import { colorAtom } from "../../../../atoms/uiAtom";

const ToolLayout = styled.div`
  display: flex;
  gap: 5px;
`;

const Button = styled.button`
  width: 25px;
  height: 25px;
  position: relative;
  * {
    display: block;
  }
`;

const HiddenColorInput = styled.input`
  width: 1px;
  height: 1px;
  border: none;
`;

export default function Tools() {
  const deleteEmpty = useSetAtom(deleteEmptyAtom);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const pickerOpenRef = useRef(false);
  const setColor = useSetAtom(colorAtom);

  const handleClickMainColorChangeButton = () => {
    if (pickerOpenRef.current) {
      colorInputRef.current?.blur();
      pickerOpenRef.current = false;
    } else {
      colorInputRef.current?.click();
      pickerOpenRef.current = true;
    }
  };

  const handleClickDeleteEmptyButton = () => {
    deleteEmpty();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = e.target.value;
    console.log("🎨 선택된 색상 코드:", selectedColor);
    setColor({ mainColor: selectedColor, sideColor: selectedColor });
  };

  return (
    <ToolLayout>
      <Button
        onClick={handleClickMainColorChangeButton}
        title="메인 컬러 바꾸기"
      >
        <ColorIcon width="inherit" height="inherit" />
        <HiddenColorInput
          ref={colorInputRef}
          type="color"
          onChange={handleColorChange}
        />
      </Button>

      <Button onClick={handleClickDeleteEmptyButton} title="빈 배열 제거">
        <CleanIcon width="inherit" height="inherit" />
      </Button>
    </ToolLayout>
  );
}
