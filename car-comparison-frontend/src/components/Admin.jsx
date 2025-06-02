import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [carForm, setCarForm] = useState({
    carName: '',
    brandName: '',
    model: '',
    priceExShowroom: '',
    bookingLink: '',
    image: '',
    
    engine: {
      engineDisplacement: '',
      cylinderConfiguration: '',
      valveTrain: '',
      engineType: '',
      fuelType: '',
      maxPower: '',
      maxTorque: '',
      mileageArai: '',
      transmissionType: '',
      drivetrain: '',
      emissionStandard: '',
      idleStartStop: ''
    },
    dimension: {
      length: '',
      width: '',
      height: '',
      wheelbase: '',
      groundClearance: '',
      bootSpace: '',
      fuelTankCapacity: '',
      seatingCapacity: '',
      tyreSize: '',
      weight: ''
    },
    features: {
      abs: ' ',
      tractionControl: ' ',
      airbags: ' ',
      hillHoldAssist: ' ',
      gncapRating: ' ',
      camera360: ' ',
      sunroof: ' ',
      fogLights: ' ',
      ventilatedSeats: ' ',
      parkingSensors: ' ',
      electronicStabilityControl: ' '
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchCars(token);
    }
  }, []);

  const fetchCars = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/cars', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const sorted = response.data.sort((a, b) => b.carId - a.carId);
      setCars(sorted);
    } catch (err) {
      console.error('Fetch cars error', err);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/admin/login', {
        username: adminUsername,
        password: adminPassword
      });
      localStorage.setItem('adminToken', response.data.token);
      setIsAuthenticated(true);
      fetchCars(response.data.token);
    } catch {
      setErrorMsg('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.reload();
  };

  const handleChange = (e, section = null) => {
    const { name, value, type, checked } = e.target;
    if (section) {
      setCarForm((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setCarForm((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    // reader.result is a base64 string
    setCarForm({ ...carForm, image: reader.result });
  };

  if (file) {
    reader.readAsDataURL(file); // Converts to base64
  }
};



  const handleCarSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('adminToken');

  const requestPayload = {
    carId: editingCar?.carId, // Include carId only when editing
    brandName: carForm.brandName,
    model: carForm.model,
    priceExShowroom: carForm.priceExShowroom,
    bookingLink: carForm.bookingLink,
    image: carForm.image,
    // Flatten the engine, dimension, features fields into the request
    ...carForm.engine,
    ...carForm.dimension,
    ...carForm.features
  };
  

  try {
    if (editingCar) {
      await axios.put(`http://localhost:8080/api/cars/update`, requestPayload, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      await axios.post('http://localhost:8080/api/cars/add', carForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    fetchCars(token);
    resetForm();
  } catch (err) {
    console.error('Add/Edit car error', err);
  }
};


  const resetForm = () => {
    setCarForm({
      carName: '',
      brandName: '',
      model: '',
      priceExShowroom: '',
      bookingLink: '',
      image: '',
      engine: {
        engineDisplacement: '',
        cylinderConfiguration: '',
        valveTrain: '',
        engineType: '',
        fuelType: '',
        maxPower: '',
        maxTorque: '',
        mileageArai: '',
        transmissionType: '',
        drivetrain: '',
        emissionStandard: '',
        idleStartStop: ''
      },
      dimension: {
        length: '',
        width: '',
        height: '',
        wheelbase: '',
        groundClearance: '',
        bootSpace: '',
        fuelTankCapacity: '',
        seatingCapacity: '',
        tyreSize: '',
        weight:''
      },
      features: {
        abs: ' ',
        tractionControl: ' ',
        airbags: ' ',
        hillHoldAssist: ' ',
        gncapRating: '',
        camera360: ' ',
        sunroof: ' ',
        fogLights: ' ',
        ventilatedSeats: ' ',
        parkingSensors: ' ',
        electronicStabilityControl: ' '
      }
    });
    setEditingCar(null);
    setShowForm(false);
  };

  const handleEdit = (car) => {
  setEditingCar(car);
  setCarForm({
    brandName: car.brandName || '',
    model: car.model || '',
    priceExShowroom: car.priceExShowroom || '',
    bookingLink: car.bookingLink || '',
    carName: car.carName || '',
    image: car.image || '',

    engine: {
      engineDisplacement: car.engine?.engineDisplacement || '',
      cylinderConfiguration: car.engine?.cylinderConfiguration || '',
      valveTrain: car.engine?.valveTrain || '',
      engineType: car.engine?.engineType || '',
      fuelType: car.engine?.fuelType || '',
      maxPower: car.engine?.maxPower || '',
      maxTorque: car.engine?.maxTorque || '',
      mileageArai: car.engine?.mileageArai || '',
      transmissionType: car.engine?.transmissionType || '',
      drivetrain: car.engine?.drivetrain || '',
      emissionStandard: car.engine?.emissionStandard || '',
      idleStartStop: car.engine?.idleStartStop || ''
    },
    dimension: {
      length: car.dimension?.length || '',
      width: car.dimension?.width || '',
      height: car.dimension?.height || '',
      wheelbase: car.dimension?.wheelbase || '',
      groundClearance: car.dimension?.groundClearance || '',
      bootSpace: car.dimension?.bootSpace || '',
      fuelTankCapacity: car.dimension?.fuelTankCapacity || '',
      seatingCapacity: car.dimension?.seatingCapacity || '',
      tyreSize: car.dimension?.tyreSize || '',
      weight: car.dimension?.weight || ''
    },
    features: {
      abs: car.features?.abs || ' ',
      tractionControl: car.features?.tractionControl || ' ',
      airbags: car.features?.airbags || '',
      hillHoldAssist: car.features?.hillHoldAssist || ' ',
      gncapRating	: car.features?.gncapRating || '',
      camera360: car.features?.camera360 || ' ',
      sunroof: car.features?.sunroof || ' ',
      fogLights: car.features?.fogLights || ' ',
      ventilatedSeats: car.features?.ventilatedSeats || ' ',
      parkingSensors: car.features?.parkingSensors || ' ',
      electronicStabilityControl: car.features?.electronicStabilityControl || ' '
    }
  });
  setShowForm(true);
};

  const toPascalCase = (str) =>
    str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (match) => match.toUpperCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
      {!isAuthenticated ? (
        <form onSubmit={handleAdminLogin} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md mx-auto">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Admin Login</h2>
          {errorMsg && <p className="text-red-500 text-sm mb-4 text-center">{errorMsg}</p>}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
            required
          />
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg pr-10"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
            </button>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>
      ) : (
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
            <button onClick={handleLogout} className="text-red-600 font-semibold hover:underline">
              Logout
            </button>
          </div>

          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingCar(null);
            }}
            className="mb-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            {editingCar ? 'Cancel Edit' : showForm ? 'Close Form' : '+ Add Car'}
          </button>

          {showForm && (
            <form onSubmit={handleCarSubmit} className="grid grid-cols-2 gap-4 mb-8">
              <input name="carName" value={carForm.carName} onChange={handleChange} placeholder="Car Name" className="p-3 border rounded-lg" />
              <input name="brandName" value={carForm.brandName} onChange={handleChange} placeholder="Brand Name" className="p-3 border rounded-lg" />
              <input name="model" value={carForm.model} onChange={handleChange} placeholder="Model" className="p-3 border rounded-lg" />
              <input name="priceExShowroom" value={carForm.priceExShowroom} onChange={handleChange} placeholder="Ex-Showroom Price" className="p-3 border rounded-lg" />
              <input name="bookingLink" value={carForm.bookingLink} onChange={handleChange} placeholder="Booking Link" className="p-3 border rounded-lg" />
             <input type="file" accept="image/*" onChange={handleImageUpload} />
 
              <div className="col-span-2 font-bold text-gray-700 mt-4">Engine</div>
              {Object.entries(carForm.engine).map(([key, value]) => (
                <input key={key} name={key} value={value} onChange={(e) => handleChange(e, 'engine')} placeholder={toPascalCase(key)} className="p-3 border rounded-lg" />
              ))}

              <div className="col-span-2 font-bold text-gray-700 mt-4">Dimension</div>
              {Object.entries(carForm.dimension).map(([key, value]) => (
                <input key={key} name={key} value={value} onChange={(e) => handleChange(e, 'dimension')} placeholder={toPascalCase(key)} className="p-3 border rounded-lg" />
              ))}
<div className="col-span-2 text-lg font-semibold text-gray-800 mt-6 mb-2"> Features</div>

{Object.entries(carForm.features).map(([key, value]) => (
  <div key={key} className="flex flex-col space-y-2">
    <label className="text-sm text-gray-700 font-medium">{toPascalCase(key)}</label>

    {['airbags', 'gncapRating'].includes(key) ? (
      <input
        type="text"
        name={key}
        value={value}
        onChange={(e) => handleChange(e, 'features')}
        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    ) : (
      <div className="flex gap-2">
        {['Yes', 'No'].map((option) => (
          <button
            key={option}
            type="button"
            className={`px-3 py-1 rounded-md border text-sm transition ${
              value === option
                ? option === 'Yes'
                  ? 'bg-green-500 text-white border-green-500'
                  : 'bg-red-500 text-white border-red-500'
                : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-100'
            }`}
            onClick={() =>
              setCarForm((prev) => ({
                ...prev,
                features: { ...prev.features, [key]: option },
              }))
            }
          >
            {option}
          </button>
        ))}
      </div>
    )}
  </div>
))}


              <div className="col-span-2">
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                  {editingCar ? 'Update Car' : 'Add Car'}
                </button>
              </div>
            </form>
          )}

          <h3 className="text-xl font-semibold mb-4">Car List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Car ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Brand</th>
                  <th className="border p-2">Model</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.carId} className="hover:bg-gray-50">
                    <td className="border p-2">{car.carId}</td>
                    <td className="border p-2">{car.carName}</td>
                    <td className="border p-2">{car.brandName}</td>
                    <td className="border p-2">{car.model}</td>
                    <td className="border p-2">{car.priceExShowroom}</td>
                    <td className="border p-2 space-x-4">
                      <button onClick={() => handleEdit(car)} className="text-blue-600 hover:underline font-medium">
                        Edit
                      </button>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
