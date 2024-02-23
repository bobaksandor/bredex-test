import {useState} from 'react';

const RegistrationForm = ({handleRegistration}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {

        const errors = {};

        if (!firstName.trim()) {

            errors.firstName = 'First name is required';

        } else if (!/^[\p{L} -]+$/u.test(firstName)) {

            errors.firstName = 'First name can only contain letters, spaces, and hyphens';
        }

        if (!lastName.trim()) {

            errors.lastName = 'Last name is required';

        } else if (!/^[\p{L} -]+$/u.test(firstName)) {

            errors.lastName = 'Last name can only contain letters, spaces, and hyphens';
        }

        if (!username.trim()) {

            errors.username = 'Username is required';

        } else if (!/^[\p{L}0-9]{4,16}$/u.test(username)) {

            errors.username = 'Username must consist of 4 to 16 alphanumeric characters';
        }

        if (!email.trim()) {

            errors.email = 'Email address is required';

        } else if (!/^\S+@\S+\.\S+$/.test(email)) {

            errors.email = 'Invalid email address';
        }

        if (!password.trim()) {

            errors.pass = 'Password is required';

        } else if (password.length < 7) {
            errors.password = 'Password must be at least 7 characters long';

        } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(password)) {

            errors.password = 'Password must contain at least one capital letter and one number';
        }

        if (confirmPassword !== password) {

            errors.confirmPassword = 'Passwords do not match';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        if (!loading && validateForm()) {
            setLoading(true);

            await handleRegistration({
                firstName,
                lastName,
                username,
                email,
                password
            });

            setLoading(false);
        }
    };

    return (
        <form className="w-full" onSubmit={handleFormSubmit}>
            <div className="mt-6 w-full px-6">
                <h2 className="text-2xl font-bold text-white mb-4">Registration</h2>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className={`border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500`}
                        type="text"
                        id="firstName"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className={`border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500`}
                        type="text"
                        id="lastName"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className={`border ${errors.username ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500`}
                        type="text"
                        id="username"
                        placeholder="johndoe123"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500`}
                        type="email"
                        id="email"
                        placeholder="johndoe123@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500`}
                        type="password"
                        id="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        className={`border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500`}
                        type="password"
                        id="confirmPassword"
                        placeholder="********"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
                <button
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}

                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </div>
        </form>
    );
};

export default RegistrationForm;