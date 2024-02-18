import { useEffect, useState } from 'react';
import Board from '@/components/Board/Board';
import Cell from '@/components/Cell/Cell';
import { useGameInfoContext } from '@/context/gameInfo';
import { usePlayInfoContext } from '@/context/playInfo';

import checkWin from '@/utils/checkWin';

const Game = () => {
  const { boardSize } = useGameInfoContext();
  const {
    currentPlayer,
    setCurrentPlayer,
    nextPlayer,
    setNextPlayer,
    renderBoard,
    setRenderBoard,
    historyBoard,
    winner,
    setWinner,
  } = usePlayInfoContext();
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    const checkingMarkCount = renderBoard.reduce(
      (acc, row) => acc + row.filter((cell) => cell.player).length,
      0
    );

    if (checkingMarkCount < boardSize) {
      return;
    }

    if (checkingMarkCount === boardSize ** 2) {
      setIsFinish(true);
    }

    function getWinner() {
      const winner = checkWin(renderBoard, boardSize);
      return winner;
    }

    const winner = getWinner();
    if (checkingMarkCount >= boardSize && winner) {
      setIsFinish(true);
    }
    setWinner(winner);
  }, [boardSize, renderBoard, setWinner]);

  function clickCell(rowIdx: number, colIdx: number) {
    // 마크 표시
    const currentOrder = historyBoard.length - 1;
    const updateBoard = [...renderBoard];
    updateBoard[rowIdx][colIdx] = { order: currentOrder, player: currentPlayer };
    setRenderBoard(updateBoard);

    // 플레이어 변경
    setCurrentPlayer(nextPlayer);
    setNextPlayer(currentPlayer);
  }

  return (
    <div className="p-10">
      <div className="w-full">
        <Board>
          {renderBoard.map((cells, cellsIdx) => (
            <div key={cellsIdx} className="flex">
              {cells.map((cell, cellIdx) => (
                <Cell
                  key={cellIdx}
                  value={cell.player?.mark || null}
                  color={cell.player?.color || null}
                  isDisabled={isFinish}
                  clickHandler={() => clickCell(cellsIdx, cellIdx)}
                />
              ))}
            </div>
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
