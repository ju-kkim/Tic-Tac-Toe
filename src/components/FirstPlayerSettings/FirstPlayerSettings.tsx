import { Player, useGameInfoContext } from '@/context/gameInfo';

const FirstPlayerSettings = () => {
  const { playerInfo, setPlayerInfo } = useGameInfoContext();
  const players = Object.values(playerInfo);

  function changeFirstPlayer(targetPalyer: Player) {
    switch (targetPalyer.name) {
      case 'player1':
        setPlayerInfo((prev) => ({
          player1: { ...prev.player1, isFirst: true },
          player2: { ...prev.player2, isFirst: false },
        }));
        break;
      case 'player2':
        setPlayerInfo((prev) => ({
          player1: { ...prev.player1, isFirst: false },
          player2: { ...prev.player2, isFirst: true },
        }));
        break;
      default:
        return;
    }
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-3">First Player</h3>
      <div className="flex gap-3">
        {players.map((player) => (
          <button
            key={player.name}
            className={`px-3 border-b-2 border-black text-xl ${
              player.isFirst ? 'border-b-2' : 'border-white hover:border-gray-400'
            } `}
            disabled={player.isFirst}
            onClick={() => changeFirstPlayer(player)}>
            {player.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FirstPlayerSettings;
