import Navbar from './NavBar.jsx';
import {Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";
import Login from ".//auth/Login.jsx";
import Registration from ".//auth/Registration.jsx";
// import ProfileComponent from "./Profile/ProfileComponent.jsx";
import {useError} from "../context/error/ErrorContext.jsx";
import ShowErrorMessage from "../context/error/ShowErrorMessage.jsx";
import {useNotification} from "../context/notification/NotificationContext.jsx";
import ShowNotificationMessage from "../context/notification/ShowNotificationMessage.jsx";
// import ProtectedRoute from "../ProtectedRoute.jsx";
// import {useSelector} from "react-redux";
import NotFound from "./NotFound.jsx";

const Layout = () => {

    const {errorState, closeError} = useError();
    const {notificationState, closeNotification} = useNotification();

    // const user = useSelector((state) => state.auth.user);
    // const token = useSelector((state) => state.auth.token);


    return (
        <div className="flex flex-col">
            <header className="fixed top-0 w-full z-10">
                <Navbar/>
            </header>

            <main className="w-full bg- bg-[url('https://www.f1-fansite.com/wp-content/uploads/2023/03/SI202303050190_hires_jpeg_24bit_rgb.jpg')] mt-20 bg-cover bg-center h-screen flex flex-col items-center justify-center">
                {errorState.errorOccurred && (
                    <ShowErrorMessage message={errorState.message} onClose={closeError}/>
                )}

                {notificationState.notificationOccurred && (
                    <ShowNotificationMessage message={notificationState.message} onClose={closeNotification}/>
                )}

                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Registration/>}/>
                    {/*<Route path="/my-profile" element={*/}
                    {/*    <ProtectedRoute user={user} token={token}>*/}
                    {/*        <ProfileComponent/>*/}
                    {/*    </ProtectedRoute>*/}
                    {/*}/>*/}

                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>

            <footer className="w-full bg-gray-800 text-white">
                <div className="container mx-auto py-4">
                    <p>&copy; 2023 Bredex - F1 Teams.</p>
                    <p>Contact: bobaksandor01@gmail.com</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;