import { BOARD_SIZE } from '@/constant/const';
import { createContext, useContext, useState } from 'react';

type BoardSize = number;
export type Mark = '●' | '■' | '▲' | '✖︎';
export type Color = 'blue' | 'red' | 'green' | 'yellow';
export interface Player {
  name: string;
  mark: Mark;
  color: Color;
  isFirst: boolean;
}
interface PlayerInfo {
  [key: string]: Player;
}
interface GameInfo {
  boardSize: BoardSize;
  playerInfo: PlayerInfo;
}

const INIT_BOARD_SIZE = BOARD_SIZE.min;

function initializePlayerInfo(): PlayerInfo {
  const isFirstPlayer = Math.random() < 0.5;

  return {
    player1: {
      name: 'player1',
      mark: '✖︎',
      color: 'blue',
      isFirst: isFirstPlayer,
    },
    player2: {
      name: 'player2',
      mark: '●',
      color: 'red',
      isFirst: !isFirstPlayer,
    },
  };
}
const INIT_PLAYER_INFO = initializePlayerInfo();

interface GameInfo {
  boardSize: BoardSize;
  setBoardSize: React.Dispatch<React.SetStateAction<number>>;
  playerInfo: PlayerInfo;
  setPlayerInfo: React.Dispatch<React.SetStateAction<PlayerInfo>>;
}

const gameInfoContext = createContext<GameInfo | null>(null);

const GameInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [boardSize, setBoardSize] = useState(INIT_BOARD_SIZE);
  const [playerInfo, setPlayerInfo] = useState(INIT_PLAYER_INFO);

  const value = { boardSize, setBoardSize, playerInfo, setPlayerInfo };

  return <gameInfoContext.Provider value={value}>{children}</gameInfoContext.Provider>;
};

const useGameInfoContext = () => {
  const context = useContext(gameInfoContext);
  if (context === null) {
    throw new Error('useGameInfoContext must be used within a GameInfoProvider');
  }
  return context;
};

export { GameInfoProvider, useGameInfoContext };