import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(true);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { name, userId, password };

        if (isRegistering) {
            // Check if user already exists
            if (localStorage.getItem(userId)) {
                setMessage('User ID already exists. Please choose a different ID.');
            } else {
                localStorage.setItem(userId, JSON.stringify(userData));
                setMessage('Registration successful! You can now log in.');
            }
        } else {
            const storedData = JSON.parse(localStorage.getItem(userId));
            if (storedData && storedData.password === password) {
                onLogin(storedData);
                setMessage('Login successful!');
            } else {
                setMessage('Invalid credentials. Please try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
                <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? 'Switch to Login' : 'Switch to Register'}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Login;
