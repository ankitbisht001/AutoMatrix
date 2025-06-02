import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SavedComparisons = () => {
  const token = localStorage.getItem('token');
  const [comparisons, setComparisons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchComparisons = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/comparisons', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComparisons(response.data.reverse());
      } catch (error) {
        console.error('Failed to fetch comparisons:', error);
      }
    };

    fetchComparisons();
  }, []);

  const handleComparisonClick = (carId1, carId2) => {
    navigate('/home', { state: { carId1, carId2 } });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-800 to-black text-white">
      <div className="flex-grow p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Saved Comparisons</h1>
        {comparisons.length === 0 ? (
          <p className="text-center text-gray-400">No saved comparisons found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {comparisons.map((comp, i) => (
              <div
                key={comp.comparisonId}
                className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer"
                onClick={() => handleComparisonClick(comp.car1.carId, comp.car2.carId)}
              >
                <h2 className="text-xl font-semibold mb-2 text-center">
                  {comp.car1.brandName} {comp.car1.carName}{" "}
                  <span className="text-yellow-500 font-bold">V/S</span>{" "}
                  {comp.car2.brandName} {comp.car2.carName}
                </h2>
                <p className="text-gray-400 text-sm text-center">Comparison : {i + 1}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="bg-gray-900 text-white text-center py-4">
        © 2025 All Rights Reserved by Ankit Bisht
      </footer>
    </div>
  );
};

export default SavedComparisons;
