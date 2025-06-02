import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import SavedComparisons from './components/SavedComparisons';
import Reviews from './components/Reviews';
import Admin from './components/Admin';
function App() {
  return (
    <Routes>
      {/* Default route: renders the Login page */}
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/saved-comparisons" element={<SavedComparisons />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/Admin" element={<Admin />} />

       {/* Catch-all route: redirects to Login for any undefined path */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}


export default App;
