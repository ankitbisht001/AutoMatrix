import React, { useState } from 'react';
import { registerUser } from '../Auth';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmVisibility = () => setConfirmVisible(!confirmVisible);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Frontend password match check
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    // Password must contain a special character
    const passwordPattern = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/;
    if (!passwordPattern.test(password)) {
      setErrorMsg("Password must contain at least one special character.");
      return;
    }

    try {
      const res = await registerUser(name, email, password);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      setErrorMsg('Signup failed. Email may already exist.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('/images/3M.gif')" }}
    >
      {/* Logo and App Name */}
      <div className="absolute top-6 w-full flex flex-col items-center justify-center z-20">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-28 h-28 sm:w-42 sm:h-42 object-contain drop-shadow-[0_0_18px_rgba(0,255,255,0.9)]"
        />
        
      </div>

      {/* Signup Form */}
      <form
        onSubmit={handleSignup}
        className="z-10 bg-opacity-20 backdrop-blur-lg p-8 rounded-xl shadow-xl w-100 mt-12"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-teal-50">Sign Up</h2>
        {errorMsg && <p className="text-red-500 text-sm mb-2">{errorMsg}</p>}

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-4 rounded bg-white bg-opacity-50 text-black border border-solid"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-white bg-opacity-50 text-black border border-solid"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password field with toggle */}
        <div className="relative mb-4">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-2 rounded bg-white bg-opacity-50 text-black border border-solid pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            pattern="(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}"
            title="Must include at least one special character"
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-gray-700"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Confirm Password field with toggle */}
        <div className="relative mb-4">
          <input
            type={confirmVisible ? 'text' : 'password'}
            placeholder="Confirm Password"
            className="w-full p-2 rounded bg-white bg-opacity-50 text-black border border-solid pr-10"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-gray-700"
            onClick={toggleConfirmVisibility}
          >
            {confirmVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-white">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </form>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full bg-black/60 backdrop-blur-md text-white text-center py-4 text-sm">
  © 2025 All Rights Reserved by Ankit Bisht
</footer>

    </div>
  );
};

export default Signup;
