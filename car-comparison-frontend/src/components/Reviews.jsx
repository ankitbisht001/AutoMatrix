import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Reviews = () => {
  const { state } = useLocation();
  const carId = state?.carId;
  const token = localStorage.getItem('token');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [carDetails, setCarDetails] = useState(null);
  const [username, setUsername] = useState('User');

  const fetchCarDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/cars/${carId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCarDetails(res.data);
    } catch (err) {
      console.error('Error fetching car details:', err);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/auth/user', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setUsername(`${response.data.username}`);
    }).catch((error) => {
      console.error('Error fetching user data:', error);
    });
  }, [state]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/reviews/${carId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(res.data.reverse());
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    fetchCarDetails();
    fetchReviews();
  }, [carId]);

  const handleSubmit = async () => {
    try {
      await axios.post(
        'http://localhost:8080/api/reviews',
        { carId, rating, reviewText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRating(0);
      setReviewText('');
      fetchReviews();
      Swal.fire({
        title: '🎉 Review Submitted!',
        text: 'Thank you for your feedback!',
        icon: 'success',
        confirmButtonText: 'Awesome 😄',
        background: '#f0fff0',
        color: '#333',
        confirmButtonColor: '#3085d6',
        footer: '⭐ You just made our day!'
      });
      
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-800 to-black text-white">
      {/* Top-left Username */}
      <div className="mb-4">
        <p className="text-lg font-semibold">{"- "+username}</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Left Panel */}
        <div className="md:col-span-1 bg-gray-900 p-4 rounded-lg shadow-md text-center">
          {carDetails?.image ? (
            <img
              src={`data:image/jpeg;base64,${carDetails.image}`}
              alt="Car"
              className="w-full h-40 object-cover rounded mb-3"
            />
          ) : (
            <div className="w-full h-40 bg-gray-700 rounded mb-3 flex items-center justify-center">
              <p className="text-gray-400">Image Loading...</p>
            </div>
          )}
          <h2 className="text-xl font-bold">
            {carDetails?.carName?.trim() || 'Brand'} {carDetails?.model?.trim() || 'Model'}
          </h2>
          <hr className="my-2 border-gray-600" />
        </div>

        {/* Main Panel */}
        <div className="md:col-span-3">
          <h2 className="text-3xl font-bold text-center mb-6">Ratings & Reviews</h2>

          {/* Star Selection */}
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, index) => {
              const starVal = index + 1;
              return (
                <button
                  key={starVal}
                  onClick={() => setRating(starVal)}
                  onMouseEnter={() => setHover(starVal)}
                  onMouseLeave={() => setHover(0)}
                  className={`text-3xl ${starVal <= (hover || rating) ? 'text-yellow-400' : 'text-gray-400'}`}
                >
                  ★
                </button>
              );
            })}
          </div>

          {/* Review Input */}
          <div className="mb-4">
            <textarea
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your thoughts about this car..."
              className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleSubmit}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded"
            >
              Submit Review
            </button>
          </div>

          {/* All Reviews */}
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-center text-gray-400">No reviews yet.</p>
            ) : (
              reviews.map((review) => {
                  const reviewer = `-${review.userName?.trim()}`;
                const dateTime = new Date(review.timestamp).toLocaleString();
                return (
                  <div key={review.reviewId} className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-gray-300">{review.reviewText}</p>
                      <div className="text-yellow-400 text-right whitespace-nowrap ml-4">
                        {'★'.repeat(review.rating)}{' '}
                        <span className="text-gray-500">{review.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{reviewer}</p>
                    <p className="text-xs text-gray-500">{dateTime}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
