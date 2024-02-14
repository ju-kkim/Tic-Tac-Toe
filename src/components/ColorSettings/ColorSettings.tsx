import { colorClassName } from '@/constant/const';
import { Color, Player, useGameInfoContext } from '@/context/gameInfo';

const colors: Color[] = ['blue', 'red', 'green', 'yellow'];
interface ColorSettingsProps {
  targetPlayer: Player;
  otherPlayerColor: Color;
}

const ColorSettings = ({ targetPlayer, otherPlayerColor }: ColorSettingsProps) => {
  const { setPlayerInfo } = useGameInfoContext();

  function changePlayerColor(color: Color) {
    setPlayerInfo((prev) => ({
      ...prev,
      [targetPlayer.name]: {
        ...prev[targetPlayer.name],
        color: color,
      },
    }));
  }

  return (
    <div className="flex gap-2 text-lg">
      {colors.map((color) => (
        <button
          key={color}
          className={`px-2 border border-black font-bold disabled:text-gray-400 ${
            targetPlayer.color === color ? colorClassName[color].bg : ''
          }`}
          onClick={() => changePlayerColor(color)}
          disabled={otherPlayerColor === color}>
          {color}
        </button>
      ))}
    </div>
  );
};

export default ColorSettings;
