import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaChevronDown, FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';


function Home() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [username, setUsername] = useState('User');
  const [carList, setCarList] = useState([]);
  const [car1, setCar1] = useState(null);
  const [car2, setCar2] = useState(null);
  const [openSection1, setOpenSection1] = useState({ engine: false, dimension: false, features: false });
  const [openSection2, setOpenSection2] = useState({ engine: false, dimension: false, features: false });

  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const [selectedBrand1, setSelectedBrand1] = useState('');
  const [selectedBrand2, setSelectedBrand2] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    
    if (state?.carId1 && state?.carId2) {
      handleCarSelect(state.carId1, 0);
      handleCarSelect(state.carId2, 1);
    }

    axios.get('http://localhost:8080/api/auth/user',   {
      headers: { Authorization: `Bearer ${token}` },   }).then((response) => {
      setUsername(response.data.username)                                  }
              ).catch((error) =>                         {
      console.error('Error fetching user data:', error); });

    axios.get('http://localhost:8080/api/cars',      {
      headers: { Authorization: `Bearer ${token}` }, }).then((response) => {
      if (Array.isArray(response.data)) {
        const sorted = response.data.sort((a, b) => b.carId - a.carId);
        setCarList(sorted);             }
         }).catch((error) => {
          console.error('Error fetching car list:', error); });
                
                }, [state]);

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');      };

  const handleCarSelect = (carId, index) => {
    if (!carId) return;

    axios.get(`http://localhost:8080/api/cars/${carId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      index === 0 ? setCar1(response.data) : setCar2(response.data);})
      .catch((error) => {
      console.error('Error fetching car details:', error);});
                                             };

  const handleSaveComparison = () => {
    if (!car1 || !car2) {
      alert("Please select both cars to save the comparison.");
      return;            }

      axios.post('http://localhost:8080/api/comparisons/save', {
        carId1: car1.carId,
        carId2: car2.carId                                     }, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(response => {
        Swal.fire({
        icon: 'success',
        text: 'Your comparison has been saved successfully!',
        confirmButtonText: 'Nice!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });   }).catch(error => {
        console.error("Error saving comparison:", error);
        alert("Failed to save comparison.");
      });
                                    };

  const toggleSection = (index, section) => {
    if (index === 0) {
      setOpenSection1(prev => ({ ...prev, [section]: !prev[section] })); } 
    else {
      setOpenSection2(prev => ({ ...prev, [section]: !prev[section] })); }
                                            };

  const renderTableSection = (title, dataObj, open, toggleFn) => (
  <div className="mb-2 border border-black rounded p-1">
    <div
      className="cursor-pointer font-semibold flex items-center text-lg mb-2"
      onClick={toggleFn}>
      <FaChevronDown
        className={`mr-2 transform transition-transform ${
          open ? 'rotate-180' : ''
        }`}
      />
      {title}
    </div>

    {open && (
      <table className="w-full text-sm border border-gray-300 bg-white rounded shadow-sm mb-2">
        <tbody>
          {Object.entries(dataObj)
            .filter(([key]) => key !== 'carId')
            .map(([key, value]) => (
              <tr key={key} className="border-b border-gray-200">
                <td className="p-2 capitalize font-medium">
                  {key.replace(/([A-Z])/g, ' $1')}
                </td>

                <td className="p-2">
                  {key.toLowerCase() === 'gncaprating' ? (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < parseInt(value)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  ) : value === 'Yes' ? (
                    <span className="text-green-600 flex items-center gap-1 font-medium">
                      <FaCheck /> 
                    </span>
                  ) : value === 'No' ? (
                    <span className="text-red-600 flex items-center gap-1 font-medium">
                      <FaTimes /> 
                    </span>
                  ) : (
                    value
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )}
  </div>
);


  const renderCarDetails = (car, index) => {
    if (!car) return <div>Select a car to view details</div>;

    const openSection = index === 0 ? openSection1 : openSection2;
    return (
      <>
        <img
          src={car.image ? `data:image/webp;base64,${car.image}` : '/images/sample.png'}
          onError={(e) => { e.target.onerror = null; e.target.src = '/images/sample.png'; }}
          alt="Car"
          className="w-full h-48 object-contain mb-4 rounded"
        />
        <div className="mb-4 text-gray-800">
          <div><strong>Brand:</strong> {car.brandName}</div>
          <div><strong>Model:</strong> {car.model}</div>
          <div><strong>Car Name:</strong> {car.carName}</div>
          <div><strong>Ex-Showroom Price:</strong> ₹{car.priceExShowroom}</div>
        </div>
        {renderTableSection('Engine', car.engine, openSection.engine, () => toggleSection(index, 'engine'))}
        {renderTableSection('Dimension', car.dimension, openSection.dimension, () => toggleSection(index, 'dimension'))}
        {renderTableSection('Features', car.features, openSection.features, () => toggleSection(index, 'features'))}

        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
          onClick={() => navigate('/reviews', { state: { carId: car.carId } })} >
          Rating & Review
        </button>
        
        <div className="mt-2">
          <a href={car.bookingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">   Book Now  </a>
        </div>
      </>
    );
  };

  const allBrands = [...new Set(carList.map(car => car.brandName))];

  const getModelsByBrand = (brand) => {
    return carList.filter(car => car.brandName === brand);
  };

  return (
    <div className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/images/car2.PNG')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
      <header className="py-4 px-6 flex justify-between items-center w-full  text-white relative z-10
                          w-full bg-blue/60 backdrop-blur-md text-white text-center py-4 text-sm">
        <div className="text-lg font-semibold">{"- " + username}</div>
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-2xl tracking-[0.2em] animate-fade-in">
       Auto <span className="italic font-bold text-white drop-shadow-md">MatriX</span>
        </h1>
        </div>
        <button
          onClick={() => navigate('/saved-comparisons')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition duration-200"
        >
          Saved Comparisons
        </button>
      </header>

      <div className="flex justify-end p-4">
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      <div className="p-6 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[car1, car2].map((car, index) => {
            const showDropdown = index === 0 ? showDropdown1 : showDropdown2;
            const selectedBrand = index === 0 ? selectedBrand1 : selectedBrand2;

            return (
              <div key={index} className="bg-white/90 p-4 rounded shadow-md">
                {!showDropdown ? (
                <button
                className="bg-gray-200 text-gray-700 w-full p-2 rounded mb-4 border border-black 
                           transform transition-transform duration-300 ease-in-out hover:scale-102 hover:shadow-lg"
                onClick={() => index === 0 ? setShowDropdown1(true) : setShowDropdown2(true)}
              >
                Select Car
              </button>
               
                ) : (
                  <>
            <select
              className="w-full p-2 border border-gray-300 rounded mb-2 bg-white text-gray-700 shadow-sm
                        transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400
                         hover:shadow-md hover:border-blue-400"
              value={selectedBrand}
              onChange={(e) => index === 0 ? setSelectedBrand1(e.target.value) : setSelectedBrand2(e.target.value)}>
                  <option value="">Select Brand</option>
                  {allBrands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option> ))}
            </select>

{selectedBrand && (
  <select
    className="w-full p-2 border border-gray-300 rounded mb-4 bg-white text-gray-700 shadow-sm
               transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400
               hover:shadow-md hover:border-blue-400"
    onChange={(e) => handleCarSelect(e.target.value, index)} >
    
        <option value="">Select Model</option>
          {getModelsByBrand(selectedBrand)
          .filter((carOption) => {       // Hides the car if it's selected in the other dropdown
          return (index === 0 && car2?.carId !== carOption.carId) ||
                (index === 1 && car1?.carId !== carOption.carId);
        })
        .map((carOption) => (
          <option key={carOption.carId} value={carOption.carId}>
            {carOption.carName} {carOption.model}
          </option>
            ))}

   </select>       )}  </>  )}
                {renderCarDetails(car, index)}  
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <button onClick={handleSaveComparison} className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-all">
            Save Comparison
          </button>
        </div>
      </div>

      <footer className="bg-black/60 text-white text-center py-6 mt-auto w-full backdrop-blur-md text-sm">
        © 2025 All Rights Reserved by Ankit Bisht
      </footer>
    </div>
  );
}

export default Home;
