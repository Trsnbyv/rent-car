import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CarModal = ({ onClose, onAddCar }) => {
  const [car, setCar] = useState({
    name: '',
    passengers: '',
    transmission: '',
    airConditioning: '',
    doors: '',
    price: '',
    reviews: '',
    rating: '',
    image: '',
  });

  const modalRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAddCar(car);
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Add New Car</h2>
        <div className="space-y-2">
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            name="name"
            placeholder="Car Name"
            onChange={handleChange}
          />
         <input
            className="w-full p-2 border border-gray-300 rounded"
            type="number"
            name="passengers"
            placeholder="Passengers"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            name="transmission"
            placeholder="Transmission"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            name="airConditioning"
            placeholder="Air Conditioning"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="number"
            name="doors"
            placeholder="Doors"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="number"
            name="reviews"
            placeholder="Reviews"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Add Car
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarModal;
