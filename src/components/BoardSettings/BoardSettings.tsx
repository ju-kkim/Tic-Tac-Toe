import { BOARD_SIZE } from '@/constant/const';
import { useGameInfoContext } from '@/context/gameInfo';
import { ChangeEvent } from 'react';

const BoardSettings = () => {
  const { boardSize, setBoardSize } = useGameInfoContext();

  function validateBoardSize(event: ChangeEvent<HTMLInputElement>) {
    const targetValue = event.target.value;
    if (BOARD_SIZE.min > Number(targetValue) || BOARD_SIZE.max < Number(targetValue)) {
      setBoardSize(BOARD_SIZE.min);
      alert(`Baord Size는 ${BOARD_SIZE.min}이상 ${BOARD_SIZE.max}이하 입니다.`);
      return;
    }
    setBoardSize(Number(targetValue));
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <h3 className="text-2xl font-bold">Board Size</h3>
        <input
          type="number"
          value={boardSize}
          min={BOARD_SIZE.min}
          max={BOARD_SIZE.max}
          className="px-1 border border-black appearance-auto"
          onChange={validateBoardSize}
        />
        <p>
          (최소 {BOARD_SIZE.min}x{BOARD_SIZE.min}, 최대 {BOARD_SIZE.max}x{BOARD_SIZE.max})
        </p>
      </div>
      <p>
        {boardSize}x{boardSize}의 보드가 준비 됩니다. 가로, 세로, 또는 대각선 방향으로 {boardSize}
        만큼 마크로 채우면 승리합니다.
      </p>
    </div>
  );
};

export default BoardSettings;
