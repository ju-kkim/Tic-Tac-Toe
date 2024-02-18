interface BoardProps {
  children: React.ReactNode;
}

const Board = ({ children }: BoardProps) => {
  return <div className="flex flex-col">{children}</div>;
};

export default Board;
