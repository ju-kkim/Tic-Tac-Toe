interface BoardProps {
  children: React.ReactNode;
  boardSize: number;
}

const Board = ({ children, boardSize }: BoardProps) => {
  return (
    <div style={{ width: `${boardSize * 100}px` }} className={`flex flex-wrap`}>
      {children}
    </div>
  );
};

export default Board;
