import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import {clearUserAndToken} from "../redux/authSlice.js";
import {useDispatch, useSelector} from 'react-redux';
import {useNotification} from "../context/notification/NotificationContext.jsx";

const Navbar = () => {

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {showNotification} = useNotification()




    return (
        <nav className="p-4 h-20  overflow-hidden">
            <div
                className="container mx-auto flex flex-row md:flex-row justify-between items-center h-full p-2 relative z-10">
                <div className="flex items-center space-x-2 md:space-x-4">
                    <Link to="/" className="text-white text-2xl md:flex md:text-5xl font-bold mb-2 md:mb-0 mr-5 ">
                        F1 Teams
                    </Link>
                </div>


                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                        {user ? (
                            <div className="flex gap-6 items-center justify-center">
                                <span className="text-white text-xl">Hello {user?.username}!</span>
                                <button
                                    className="mx-auto bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-700 transition duration-300"
                                    onClick={() => {
                                        Cookies.remove('jwtToken');
                                        dispatch(clearUserAndToken());
                                        showNotification('You have been logged out.');
                                        navigate('/');
                                    }}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-row gap-5 items-center justify-center">
                                <Link to="/login" className="text-white hover:text-gray-300 text-xl">
                                    Login
                                </Link>
                                <Link to="/register" className="text-white hover:text-gray-300 text-xl">
                                    Register
                                </Link>
                            </div>
                        )}


                    </div>
                </div>
            </div>
            <div
                className="absolute inset-0 bg-gradient-to-r bg-gray-800 opacity-90">

            </div>
        </nav>
    );
};

export default Navbar;