import { colorClassName } from '@/constant/const';
import { Color, Mark } from '@/context/gameInfo';
import { MouseEventHandler } from 'react';

interface CellProps {
  value: Mark | null;
  color: Color | null;
  isDisabled: boolean;
  clickHandler?: MouseEventHandler;
}

const Cell = ({ value, color, isDisabled, clickHandler }: CellProps) => {
  return (
    <button
      className={`border border-black w-[100px] h-[100px] text-3xl ${
        color ? colorClassName[color].text : ''
      }`}
      disabled={!!value || isDisabled}
      onClick={clickHandler}>
      {value}
    </button>
  );
};

export default Cell;
