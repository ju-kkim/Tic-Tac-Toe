import { RenderBoard } from '@/context/playInfo';

export default function checkMarkCount(board: RenderBoard) {
  return board.reduce((acc, row) => acc + row.filter((cell) => cell.player).length, 0);
}
