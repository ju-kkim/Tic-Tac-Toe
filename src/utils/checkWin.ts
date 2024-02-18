import { RenderBoard } from '@/context/playInfo';

export default function checkWin(board: RenderBoard, boardSize: number) {
  let checkPlayer = null;
  // 가로
  for (let row = 0; row < boardSize; row++) {
    checkPlayer = board[row][0].player;
    if (
      board[row].every(
        (cell) => cell.player?.mark && cell.player?.mark === board[row][0].player?.mark
      )
    ) {
      return checkPlayer;
    }
  }

  // 세로
  for (let col = 0; col < boardSize; col++) {
    const firstOfTargetCol = board[0][col].player?.mark;
    let isVerticalSame = false;
    for (let row = 1; row < boardSize; row++) {
      checkPlayer = board[row][col].player;
      const targetCell = board[row][col].player?.mark;
      isVerticalSame = !!targetCell && targetCell === firstOfTargetCol;
      if (!isVerticalSame) break;
    }
    if (isVerticalSame) {
      return checkPlayer;
    }
  }

  // 왼->오 대각선
  const leftTopCell = board[0][0].player?.mark;
  checkPlayer = board[0][0].player;
  let isLeftDiagonalSmae = false;
  for (let i = 1; i < boardSize; i++) {
    const leftTargetCell = board[i][i].player?.mark;
    isLeftDiagonalSmae = !!leftTargetCell && leftTargetCell === leftTopCell;
    if (!isLeftDiagonalSmae) break;
  }
  if (isLeftDiagonalSmae) {
    return checkPlayer;
  }

  // 오->왼 대각선
  const RightTopCell = board[0][boardSize - 1].player?.mark;
  checkPlayer = board[0][boardSize - 1].player;
  let isRightDiagonalSame = false;
  for (let i = 1; i < boardSize; i++) {
    const rightTargetCell = board[i][boardSize - 1 - i].player?.mark;
    isRightDiagonalSame = !!rightTargetCell && rightTargetCell === RightTopCell;
    if (!isRightDiagonalSame) break;
  }
  if (isRightDiagonalSame) {
    return checkPlayer;
  }

  return null;
}
