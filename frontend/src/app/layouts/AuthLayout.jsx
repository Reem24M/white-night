import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f6f0]">
      <Outlet />
    </div>
  );
};

export default AuthLayout;