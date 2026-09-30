import { Outlet } from 'react-router-dom';

export default function PageLayout() {
  return (
    <div className="mx-auto max-w-7xl pb-16 pt-4 md:pb-4">
      <Outlet />
    </div>
  );
}
