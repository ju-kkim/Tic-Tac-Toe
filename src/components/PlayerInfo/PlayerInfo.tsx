import { MAX_CANCLE_COUNT, colorClassName } from '@/constant/const';
import { Player, useGameInfoContext } from '@/context/gameInfo';
import { usePlayInfoContext } from '@/context/playInfo';

interface PlayerProps {
  player: Player;
}

const PlayerInfo = ({ player }: PlayerProps) => {
  const { setPlayerInfo } = useGameInfoContext();
  const { players, currentPlayerIdx, historyBoard, setHistoryBoard, changePlayerOrder, isFinish } =
    usePlayInfoContext();
  const textColor = colorClassName[player.color].text;
  const isFirstOrder = historyBoard.length === 1;
  const isUsedCancleCount = player.cancleCount === MAX_CANCLE_COUNT;
  const isDisabled =
    player === players[currentPlayerIdx] || isFirstOrder || isUsedCancleCount || isFinish;

  function cancleMarking() {
    const beforeBoard = historyBoard.slice(0, historyBoard.length - 1);
    setHistoryBoard(beforeBoard);
    setPlayerInfo((prev) => ({
      ...prev,
      [player.name]: {
        ...prev[player.name],
        cancleCount: prev[player.name].cancleCount + 1,
      },
    }));
    changePlayerOrder();
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <p
        style={{ borderColor: player === players[currentPlayerIdx] ? 'black' : 'white' }}
        className={`border-b-2 ${textColor} text-center `}>
        {player.name} <span>{player.mark}</span>
      </p>
      <button
        type="button"
        disabled={isDisabled}
        className={`border border-black px-2 rounded-md disabled:border-gray-50 disabled:bg-gray-500 ${
          isDisabled ? '' : 'hover:bg-black hover:text-white'
        }`}
        onClick={cancleMarking}>
        무르기
      </button>
      <p>남은 무르기 횟수 : {MAX_CANCLE_COUNT - player.cancleCount}</p>
    </div>
  );
};

export default PlayerInfo;
