import { createContext, useContext, useEffect, useState } from 'react';
import { Player, useGameInfoContext } from './gameInfo';

interface CellInfo {
  order: number;
  player: Player | null;
}
export type RenderBoard = CellInfo[][];
export type HistoryBoard = RenderBoard[];

interface PlayInfo {
  currentPlayer: Player;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<Player>>;
  nextPlayer: Player;
  setNextPlayer: React.Dispatch<React.SetStateAction<Player>>;
  renderBoard: RenderBoard;
  setRenderBoard: React.Dispatch<React.SetStateAction<RenderBoard>>;
  historyBoard: HistoryBoard;
  setHistoryBoard: React.Dispatch<React.SetStateAction<HistoryBoard>>;
  winner: Player | null;
  setWinner: React.Dispatch<React.SetStateAction<Player | null>>;
}

const playInfoContext = createContext<PlayInfo | null>(null);

const PlayInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const { boardSize, playerInfo } = useGameInfoContext();

  const INIT_FIRST_PAYER = Object.values(playerInfo).filter((player) => player.isFirst);
  const INIT_SECOND_PLAYER = Object.values(playerInfo).filter((player) => !player.isFirst);

  const [currentPlayer, setCurrentPlayer] = useState(INIT_FIRST_PAYER[0]);
  const [nextPlayer, setNextPlayer] = useState(INIT_SECOND_PLAYER[0]);
  const [renderBoard, setRenderBoard] = useState<RenderBoard>([]);
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
    setRenderBoard(board);
    setHistoryBoard([board]);
  }, [boardSize]);

  const value = {
    currentPlayer,
    setCurrentPlayer,
    nextPlayer,
    setNextPlayer,
    renderBoard,
    setRenderBoard,
    historyBoard,
    setHistoryBoard,
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
