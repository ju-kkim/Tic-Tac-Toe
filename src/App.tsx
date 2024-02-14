import { Outlet } from 'react-router-dom';
import { GameInfoProvider } from './context/gameInfo';

function App() {
  return (
    <GameInfoProvider>
      <Outlet />
    </GameInfoProvider>
  );
}

export default App;
