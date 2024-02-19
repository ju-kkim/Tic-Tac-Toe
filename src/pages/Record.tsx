import Board from '@/components/Board/Board';
import Cell from '@/components/Cell/Cell';
import { useGameInfoContext } from '@/context/gameInfo';
import { Link } from 'react-router-dom';

const Record = () => {
  const { recordGame } = useGameInfoContext();
  return (
    <div className="p-10 text-center">
      {recordGame.length === 0 ? (
        <p>저장된 게임이 없습니다.</p>
      ) : (
        recordGame.map((game, gameIdx) => (
          <div key={gameIdx} className="flex flex-col items-center py-4 border-b border-gray-300">
            <p className="mb-3 text-2xl">
              {game.winner ? `${game.winner.name}${game.winner.mark} 승리` : '무승부'}
            </p>
            <Board>
              {game.board.map((cells, cellsIdx) => (
                <div key={cellsIdx} className="flex">
                  {cells.map((cell, cellIdx) => (
                    <div key={cellIdx} className="relative flex">
                      <Cell
                        value={cell.player?.mark || null}
                        color={cell.player?.color || null}
                        isDisabled={true}
                      />
                      <span className="absolute top-0 left-0 text-lg px-1">
                        {cell.order || null}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </Board>
          </div>
        ))
      )}
      <Link to={'/'} className="inline-block btn mt-3">
        Home
      </Link>
    </div>
  );
};

export default Record;
