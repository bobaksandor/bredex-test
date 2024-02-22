import Cookies from 'js-cookie';
import {useDispatch} from 'react-redux';
import {setUserAndToken} from '../../redux/authSlice.js';
import LoginForm from './LoginForm.jsx';
import {useError} from "../../context/error/ErrorContext.jsx";
import {useNavigate} from "react-router-dom";
import {useNotification} from "../../context/notification/NotificationContext.jsx";

const Login = () => {

    const dispatch = useDispatch();
    const {showError} = useError();
    const {showNotification} = useNotification()
    const navigate = useNavigate();

    const handleLogin = async (username, password) => {

        try {

            const response = await fetch('http://localhost:8080/api/v1/auth/login', {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            if (response.ok) {

                const data = await response.json();

                Cookies.set('jwtToken', data.token, {expires: 7}, {sameSite: 'strict'}, {secure: true});

                const userResponse = await fetch('http://localhost:8080/api/v1/auth/get-authenticated-user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${data.token}`,
                    },
                });

                if (userResponse.ok) {

                    const userData = await userResponse.json();

                    dispatch(setUserAndToken({user: userData, token: data.token}));

                    showNotification('Login successful');

                    navigate('/');

                } else {

                    showError('Failed to fetch user data');
                }
            } else {

                const text = await response.text();
                showError(text || 'Authentication failed');
            }
        } catch (error) {

            console.log(error)

            showError('Authentication failed', error);
        }
    };


    return (
        <div className="w-full">
            <LoginForm handleLogin={handleLogin}/>
        </div>
    );
};

export default Login;