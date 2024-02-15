import { PlayInfoProvider } from '@/context/playInfo';
import { Outlet } from 'react-router-dom';

const PlayLayout = () => {
  return (
    <PlayInfoProvider>
      <Outlet />
    </PlayInfoProvider>
  );
};

export default PlayLayout;
