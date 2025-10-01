import { Outlet } from 'react-router-dom';
import HeaderLayout from './HeaderLayout';

const DefaultLayout = () => {
  return (
    <div className="flex flex-col h-screen font-display">
      <HeaderLayout />
      <main className="flex-grow scrollable p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
