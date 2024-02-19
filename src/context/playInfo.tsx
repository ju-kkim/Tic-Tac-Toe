import { createContext, useContext, useEffect, useState } from 'react';
import { Player, useGameInfoContext } from './gameInfo';

interface CellInfo {
  order: number;
  player: Player | null;
}
export type RenderBoard = CellInfo[][];
export type HistoryBoard = RenderBoard[];

interface PlayInfo {
  historyBoard: HistoryBoard;
  setHistoryBoard: React.Dispatch<React.SetStateAction<HistoryBoard>>;
  winner: Player | null;
  setWinner: React.Dispatch<React.SetStateAction<Player | null>>;
  players: Player[];
  currentPlayerIdx: number;
  changePlayerOrder: () => void;
  isFinish: boolean;
  setIsFinish: React.Dispatch<React.SetStateAction<boolean>>;
}

const playInfoContext = createContext<PlayInfo | null>(null);

const PlayInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const { boardSize, playerInfo } = useGameInfoContext();
  const players: Player[] = Object.values(playerInfo).sort((a, b) => {
    if (a.isFirst && !b.isFirst) return -1;
    if (!a.isFirst && b.isFirst) return 1;

    return 0;
  });
  const [isFinish, setIsFinish] = useState(false);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [historyBoard, setHistoryBoard] = useState<HistoryBoard>([]);
  const [winner, setWinner] = useState<Player | null>(null);

  useEffect(() => {
    const initCell: CellInfo = {
      order: 0,
      player: null,
    };
    const board: RenderBoard = Array.from({ length: boardSize }, () =>
      Array.from({ length: boardSize }, () => initCell)
    );
    setHistoryBoard([board]);
  }, [boardSize]);

  function changePlayerOrder() {
    setCurrentPlayerIdx((currentIndex) => (currentIndex + 1) % players.length);
  }

  const value = {
    historyBoard,
    setHistoryBoard,
    winner,
    setWinner,
    players,
    currentPlayerIdx,
    changePlayerOrder,
    isFinish,
    setIsFinish,
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
