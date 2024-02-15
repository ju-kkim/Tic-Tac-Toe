import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Settings from '@/pages/Settings';
import Game from '@/pages/Game';
import Record from '@/pages/Record';
import Home from '@/pages/Home';
import PlayLayout from '@/layout/PlayLayout';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/game',
        element: <PlayLayout />,
        children: [
          {
            path: 'play',
            element: <Game />,
          },
          {
            path: 'record',
            element: <Record />,
          },
        ],
      },
    ],
  },
]);

export default router;
