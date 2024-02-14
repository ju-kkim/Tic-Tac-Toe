import { useGameInfoContext } from '@/context/gameInfo';
import ColorSettings from '../ColorSettings/ColorSettings';
import MarkSettings from '../MarkSettings/MarkSettings';

const PlayerSettings = () => {
  const { playerInfo } = useGameInfoContext();
  const { player1, player2 } = playerInfo;

  return (
    <div>
      <h3 className="text-2xl font-bold">Player</h3>
      <div className="flex gap-5 flex-wrap mt-3">
        <div className="flex flex-col gap-3 ">
          <h4 className="text-xl font-bold">player1</h4>
          <div>
            <h5 className="text-lg font-bold mb-2">color</h5>
            <ColorSettings targetPlayer={player1} otherPlayerColor={player2.color} />
          </div>
          <div>
            <h5 className="text-lg font-bold mb-2">mark</h5>
            <MarkSettings targetPlayer={player1} otherPlayerMark={player2.mark} />
          </div>
        </div>
        <div className="flex flex-col gap-3 ">
          <h4 className="text-xl font-bold">player2</h4>
          <div>
            <h5 className="text-lg font-bold mb-2">color</h5>
            <ColorSettings targetPlayer={player2} otherPlayerColor={player1.color} />
          </div>
          <div>
            <h5 className="text-lg font-bold mb-2">mark</h5>
            <MarkSettings targetPlayer={player2} otherPlayerMark={player1.mark} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSettings;
