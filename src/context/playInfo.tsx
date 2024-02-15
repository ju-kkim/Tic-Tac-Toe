import { createContext, useContext, useState } from 'react';
import { Player, useGameInfoContext } from './gameInfo';

interface PlayInfo {
  currentPlayer: Player;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<Player>>;
  nextPlayer: Player;
  setNextPlayer: React.Dispatch<React.SetStateAction<Player>>;
  renderBoard: Player[];
  setRenderBoard: React.Dispatch<React.SetStateAction<Player[]>>;
  history: Player[][];
  setHistory: React.Dispatch<React.SetStateAction<Player[][]>>;
  winner: Player | null;
  setWinner: React.Dispatch<React.SetStateAction<Player | null>>;
}

const playInfoContext = createContext<PlayInfo | null>(null);

const PlayInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const { playerInfo } = useGameInfoContext();

  const INIT_FIRST_PAYER = Object.values(playerInfo).filter((player) => player.isFirst);
  const INIT_SECOND_PLAYER = Object.values(playerInfo).filter((player) => !player.isFirst);

  const [currentPlayer, setCurrentPlayer] = useState(INIT_FIRST_PAYER[0]);
  const [nextPlayer, setNextPlayer] = useState(INIT_SECOND_PLAYER[0]);
  const [renderBoard, setRenderBoard] = useState<Player[]>([]);
  const [history, setHistory] = useState<Player[][]>([]);
  const [winner, setWinner] = useState<Player | null>(null);

  const value = {
    currentPlayer,
    setCurrentPlayer,
    nextPlayer,
    setNextPlayer,
    renderBoard,
    setRenderBoard,
    history,
    setHistory,
    winner,
    setWinner,
  };
  return <playInfoContext.Provider value={value}>{children}</playInfoContext.Provider>;
};

const usePlayInfoContext = () => {
  const context = useContext(playInfoContext);
  if (context === null) {
    throw new Error('usePlayInfoContext must be used within a PlayInfoProvider');
  }
  return context;
};

export { PlayInfoProvider, usePlayInfoContext };
