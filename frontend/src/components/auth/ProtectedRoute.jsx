import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const location = useLocation();

  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;