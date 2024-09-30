import { Navigate, Outlet } from 'react-router-dom';

// HOC to check for access token
const MustAuth = () => {
    const accessToken = localStorage.getItem('token')

    if (!accessToken) {
        // Redirect to login page if no access token is found
        return <Navigate to="/login" />
    }

    // If access token exists, render the component
    return <Outlet />
};

export default MustAuth;
