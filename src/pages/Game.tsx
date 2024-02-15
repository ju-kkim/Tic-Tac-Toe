import { useEffect, useState } from 'react';
import Board from '@/components/Board/Board';
import Cell from '@/components/Cell/Cell';
import { Player, useGameInfoContext } from '@/context/gameInfo';
import { usePlayInfoContext } from '@/context/playInfo';

const Game = () => {
  const { boardSize } = useGameInfoContext();
  const {
    currentPlayer,
    setCurrentPlayer,
    nextPlayer,
    setNextPlayer,
    renderBoard,
    setRenderBoard,
    winner,
    setWinner,
  } = usePlayInfoContext();
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    const board: Player[] = Array(boardSize ** 2).fill({});
    setRenderBoard(board);
  }, [boardSize, setRenderBoard]);

  useEffect(() => {
    if (renderBoard.length === 0) {
      return;
    }
    const checkingMark = renderBoard.filter((cell) => cell.mark).length;
    if (checkingMark < boardSize) {
      return;
    }
    if (checkingMark === boardSize ** 2) {
      setIsFinish(true);
    }

    function getWinner() {
      const checkBoard = convertTo2DBoard(renderBoard, boardSize);
      const winner = checkWin(checkBoard, boardSize);
      return winner;
    }

    const winner = getWinner();
    if (checkingMark >= boardSize && winner) {
      setIsFinish(true);
    }
    setWinner(winner);
  }, [boardSize, renderBoard, setWinner]);

  function checkWin(board: Player[][], boardSize: number) {
    let checkPlayer = null;
    // 가로
    for (let row = 0; row < boardSize; row++) {
      checkPlayer = board[row][0];
      if (board[row].every((cell) => cell.mark && cell.mark === board[row][0].mark)) {
        return checkPlayer;
      }
    }

    // 세로
    for (let col = 0; col < boardSize; col++) {
      const firstOfTargetCol = board[0][col].mark;
      let isVerticalSame = false;
      for (let row = 1; row < boardSize; row++) {
        checkPlayer = board[row][col];
        const targetCell = board[row][col].mark;
        isVerticalSame = targetCell && targetCell === firstOfTargetCol;
        if (!isVerticalSame) break;
      }
      if (isVerticalSame) {
        return checkPlayer;
      }
    }

    // 왼->오 대각선
    const leftTopCell = board[0][0].mark;
    checkPlayer = board[0][0];
    let isLeftDiagonalSmae = false;
    for (let i = 1; i < boardSize; i++) {
      const leftTargetCell = board[i][i].mark;
      isLeftDiagonalSmae = leftTargetCell && leftTargetCell === leftTopCell;
      if (!isLeftDiagonalSmae) break;
    }
    if (isLeftDiagonalSmae) {
      return checkPlayer;
    }

    // 오->왼 대각선
    const RightTopCell = board[0][boardSize - 1].mark;
    checkPlayer = board[0][boardSize - 1];
    let isRightDiagonalSame = false;
    for (let i = 1; i < boardSize; i++) {
      const rightTargetCell = board[i][boardSize - 1 - i].mark;
      isRightDiagonalSame = rightTargetCell && rightTargetCell === RightTopCell;
      if (!isRightDiagonalSame) break;
    }
    if (isRightDiagonalSame) {
      return checkPlayer;
    }

    return null;
  }

  function clickCell(index: number) {
    // 마크 표시
    const updateBoard = [...renderBoard];
    updateBoard[index] = currentPlayer;
    setRenderBoard(updateBoard);

    // 플레이어 변경
    setCurrentPlayer(nextPlayer);
    setNextPlayer(currentPlayer);
  }

  return (
    <div className="p-10">
      <div className="w-full">
        <Board boardSize={boardSize}>
          {renderBoard.map((cell, cellIdx) => (
            <Cell
              key={cellIdx}
              value={cell.mark}
              color={cell.color}
              isDisabled={isFinish}
              clickHandler={() => clickCell(cellIdx)}
            />
          ))}
        </Board>
        {isFinish && winner && (
          <div>
            승리 {winner.name}
            {winner.mark}
          </div>
        )}
        {isFinish && winner === null && <div>무승부입니다</div>}
      </div>
    </div>
  );
};

export default Game;

function convertTo2DBoard(board: Player[], boardSize: number) {
  const convertBoard: Player[][] = [];

  for (let i = 0; i < board.length; i += boardSize) {
    const row = board.slice(i, i + boardSize);
    convertBoard.push(row);
  }

  return convertBoard;
}
