import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Settings from '@/pages/Settings';
import Game from '@/pages/Game';
import Record from '@/pages/Record';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/game',
    element: <Game />,
  },
  {
    path: '/record',
    element: <Record />,
  },
]);

export default router;
