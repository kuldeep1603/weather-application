import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Page/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fav from './Page/FavCity/Fav';
import Login from './Page/Auth/Login';
import Signup from './Page/Auth/Signup';
import { AuthProvider } from '../src/Page/Auth/AuthContext'; 
import AuthGuard from '../src/Page/Auth/AuthGuard'; 

function App() {
    const AppContent = () => {
        const location = useLocation();

        const hideNavbarRoutes = ['/login', '/signup'];

        return (
            <>
                {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
                <Routes>
                    <Route
                        path="/"
                        element={
                            <AuthGuard>
                                <Dashboard />
                            </AuthGuard>
                        }
                    />
                    <Route path="/Favourite" element={<Fav />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element="Page Not Found ...!" />
                </Routes>
                <ToastContainer />
            </>
        );
    };

    return (
        <AuthProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
