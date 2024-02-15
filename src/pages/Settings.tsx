import BoardSettings from '@/components/BoardSettings/BoardSettings';
import FirstPlayerSettings from '@/components/FirstPlayerSettings/FirstPlayerSettings';
import PlayerSettings from '@/components/PlayerSettings/PlayerSettings';
import { Link } from 'react-router-dom';

const Settings = () => {
  return (
    <div className="p-10">
      <h2 className="text-4xl font-bold">게임 설정</h2>
      <div className="flex flex-col gap-10 mt-5 mx-auto w-2/4">
        <BoardSettings />
        <PlayerSettings />
        <FirstPlayerSettings />
        <Link to={'/game/play'} className="btn self-center mt-10">
          GAME START
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default Settings;
