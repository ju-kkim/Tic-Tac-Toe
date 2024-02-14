import { colorClassName } from '@/constant/const';
import { Mark, Player, useGameInfoContext } from '@/context/gameInfo';

const marks: Mark[] = ['●', '■', '▲', '✖︎'];
interface MarkSettingsProps {
  targetPlayer: Player;
  otherPlayerMark: Mark;
}

const MarkSettings = ({ targetPlayer, otherPlayerMark }: MarkSettingsProps) => {
  const { setPlayerInfo } = useGameInfoContext();

  function changePlayerMark(mark: Mark) {
    setPlayerInfo((prev) => ({
      ...prev,
      [targetPlayer.name]: {
        ...prev[targetPlayer.name],
        mark: mark,
      },
    }));
  }

  return (
    <div className="flex gap-2 text-lg">
      {marks.map((mark) => (
        <button
          key={mark}
          className={`border border-black w-10 text-2xl disabled:text-gray-300 ${
            targetPlayer.mark === mark ? colorClassName[targetPlayer.color].text : ''
          }`}
          onClick={() => changePlayerMark(mark)}
          disabled={otherPlayerMark === mark}>
          {mark}
        </button>
      ))}
    </div>
  );
};

export default MarkSettings;
