import { useEffect, useState } from 'react';
import Board from '@/components/Board/Board';
import Cell from '@/components/Cell/Cell';
import { useGameInfoContext } from '@/context/gameInfo';
import { RenderBoard, usePlayInfoContext } from '@/context/playInfo';
import checkWin from '@/utils/checkWin';
import checkMarkCount from '@/utils/checkMarkCount';
import { Link } from 'react-router-dom';
import PlayerInfo from '@/components/PlayerInfo/PlayerInfo';

const Game = () => {
  const { boardSize, playerInfo, setRecordGame } = useGameInfoContext();
  const { player1, player2 } = playerInfo;
  const {
    players,
    currentPlayerIdx,
    changePlayerOrder,
    historyBoard,
    setHistoryBoard,
    winner,
    setWinner,
    isFinish,
    setIsFinish,
  } = usePlayInfoContext();
  const [renderBoard, setRenderBoard] = useState<RenderBoard>([]);

  useEffect(() => {
    if (historyBoard.length === 0) {
      return;
    }
    const board = historyBoard[historyBoard.length - 1];
    setRenderBoard(board);
  }, [historyBoard]);

  useEffect(() => {
    if (!isFinish) {
      return;
    }

    setRecordGame((prev) => [...prev, { winner: winner, board: renderBoard }]);
  }, [isFinish, renderBoard, setRecordGame, winner]);

  useEffect(() => {
    const markCount = checkMarkCount(renderBoard);

    if (markCount < boardSize) {
      return;
    }

    if (markCount === boardSize ** 2) {
      setIsFinish(true);
    }

    function getWinner() {
      const winner = checkWin(renderBoard, boardSize);
      return winner;
    }

    const winner = getWinner();
    if (markCount >= boardSize && winner) {
      setIsFinish(true);
    }
    setWinner(winner);
  }, [boardSize, renderBoard, setWinner, setIsFinish]);

  function clickCell(rowIdx: number, colIdx: number) {
    // 마크 표시
    const currentOrder = historyBoard.length;
    const updateBoard = renderBoard.map((row) => row.map((cell) => ({ ...cell })));
    updateBoard[rowIdx][colIdx] = { order: currentOrder, player: players[currentPlayerIdx] };
    setHistoryBoard((prev) => [...prev, updateBoard]);

    // 플레이어 변경
    changePlayerOrder();
  }

  return (
    <div className="p-10">
      <Link to={'/'} className="btn mt-5">
        HOME
      </Link>
      <div className="flex flex-col items-center">
        <div className="flex gap-5 mb-5">
          <PlayerInfo player={player1} />
          <PlayerInfo player={player2} />
        </div>

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
        <div className="mt-2">
          {isFinish && winner && (
            <div className="text-lg">
              승리 {winner.name}
              {winner.mark}
            </div>
          )}
          {isFinish && winner === null && <div className="text-lg">무승부입니다</div>}
        </div>
      </div>
    </div>
  );
};

export default Game;
