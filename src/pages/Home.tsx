import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center gap-10">
      <h1 className="text-5xl font-bold">Tic Tac Toe</h1>
      <Link to={'/settings'} className="btn text-3xl">
        게임 시작
      </Link>
      <Link to={'/game/record'} className="text-xl">
        기록된 게임 보기
      </Link>
    </div>
  );
}

export default Home;
