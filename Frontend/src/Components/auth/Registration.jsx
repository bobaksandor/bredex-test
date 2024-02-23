import Cookies from 'js-cookie';
import {useDispatch} from 'react-redux';
import {setUserAndToken} from '../../redux/authSlice.js';
import RegisterForm from "./RegistrationForm.jsx";
import {useError} from "../../context/error/ErrorContext.jsx";
import {useNavigate} from "react-router-dom";
import {useNotification} from "../../context/notification/NotificationContext.jsx";

const Registration = () => {
    const dispatch = useDispatch();
    const {showError} = useError();
    const {showNotification} = useNotification()
    const navigate = useNavigate();

    const handleRegistration = async ({firstName, lastName, username, email, password}) => {

        try {

            const response = await fetch('http://localhost:8080/api/v1/auth/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "firstName": firstName,
                    "lastName": lastName,
                    "username": username,
                    "email": email,
                    "password": password
                }),
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

                    showNotification('Registration successful');

                    navigate('/');

                } else {

                    const text = await userResponse.text();
                    showError(text || 'Failed to fetch user data');
                }
            } else {

                const text = await response.text();
                showError(text || 'Registration failed');
            }
        } catch (error) {

            console.log(error)

            showError('Registration failed', error);
        }
    };

    return (
        <div className="w-full">
            <RegisterForm handleRegistration={handleRegistration}/>
        </div>
    );
};

export default Registration;