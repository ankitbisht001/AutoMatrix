import React, { useState } from 'react';
import { loginUser } from '../Auth';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      setErrorMsg('Invalid email or password');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('/images/3M.gif')" }}
    >
      {/* Logo and App Name */}
      <div className="absolute top-2 w-full flex flex-col items-center justify-center">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-54 h-54 sm:w-51 sm:h-51 object-contain drop-shadow-[0_0_15px_rgba(0,255,255,0.7)]"
        />
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="bg-opacity-20 backdrop-blur-lg p-8 rounded-xl shadow-xl w-90 border"
        style={{ padding: '12px' }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-teal-50">Login</h2>
        {errorMsg && <p className="text-red-500 text-sm mb-2">{errorMsg}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-white bg-opacity-50 text-black border border-solid"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password with Eye Toggle */}
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-2 pr-10 rounded bg-white bg-opacity-50 text-black border border-solid"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-700 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Login
        </button>

        <p className="mt-4 text-center text-white">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>

        {/* Admin Login Button */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="text-sm text-yellow-300 hover:underline hover:text-yellow-400"
          >
            Login as Admin
          </button>
        </div>
      </form>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full bg-black/60 backdrop-blur-md text-white text-center py-4 text-sm">
        © 2025 All Rights Reserved by Ankit Bisht
      </footer>
    </div>
  );
};

export default Login;
