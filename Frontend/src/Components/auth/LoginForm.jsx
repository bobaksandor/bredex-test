import {useState} from 'react';

const LoginForm = ({handleLogin}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {

        const errors = {};

        if (!username.trim()) {

            errors.username = 'Username is required';
        } else if (username.length < 4) {

            errors.username = 'Username must be at least 4 characters';
        }

        if (!password.trim()) {

            errors.password = 'Password is required';
        } else if (password.length < 7) {
            errors.password = 'Password must be at least 7 characters';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = async (e) => {

        e.preventDefault();
        if (!loading && validateForm()) {
            setLoading(true);

            await handleLogin(username, password);

            setLoading(false);

            setPassword('');
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="max-w-md mx-auto p-6 bg-gray-800 opacity-90 rounded-md shadow-md">
                <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                        type="text"
                        id="username"
                        placeholder="johndoe123"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
                        type="password"
                        id="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <button
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </div>
        </form>
    );
};

export default LoginForm;