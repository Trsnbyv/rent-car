import { useState, useEffect } from "react";
import StarIcon from "../assets/images/star-icon.svg";
import PassengerIcon from "../assets/images/passengers-icon.svg";
import GearBoxIcon from "../assets/images/gearbox-icon.svg";
import AirConIcon from "../assets/images/air-con-icon.svg";
import DoorIcon from "../assets/images/door-icon.svg";
import ArrowIcon from "../assets/images/arrow-icon.svg"

const App = () => {
  const [cars, setCars] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    passengers: "1",
    transmission: "Auto",
    airConditioning: "Air conditioning",
    doors: "2",
    price: "",
    reviews: "",
    rating: "1",
    image: "",
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const response = await fetch("http://localhost:5000/cars");
    const data = await response.json();
    setCars(data);
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({
      name: "",
      passengers: "1",
      transmission: "Auto",
      airConditioning: "Air conditioning",
      doors: "2",
      price: "",
      reviews: "",
      rating: "1",
      image: "",
    });
    setShowModal(false);
    fetchCars();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/cars/${id}`, {
      method: "DELETE",
    });
    fetchCars();
  };

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowFewer = () => {
    setShowAll(false);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className="mb-6 px-[32px] py-[16px] border-[3px] border-transparent hover:border-[#1572D3] duration-300 mx-auto block bg-[#1572D31A] text-[#1572D3] font-medium text-[14px] rounded-[8px] "
        onClick={() => setShowModal(true)}
      >
        Add Cars
      </button>
      <h2 className="text-[38px] font-medium text-[#333333] text-center mb-[24px]">
        Most popular cars rental deals
      </h2>

      {showModal && (
        <div className="modal fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-1/2">
            <h2 className="text-xl font-bold mb-4">Add Car</h2>
            <form onSubmit={handleAddCar}>
              <input
                type="text"
                placeholder="Car Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border mb-2 p-2 w-full"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="border mb-2 p-2 w-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: URL.createObjectURL(e.target.files[0]),
                  })
                }
                className="border mb-2 p-2 w-full"
              />
              <select
                value={formData.passengers}
                onChange={(e) =>
                  setFormData({ ...formData, passengers: e.target.value })
                }
                className="border mb-2 p-2 w-full"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Passenger{i > 0 ? "s" : ""}
                  </option>
                ))}
              </select>
              <select
                value={formData.transmission}
                onChange={(e) =>
                  setFormData({ ...formData, transmission: e.target.value })
                }
                className="border mb-2 p-2 w-full"
              >
                <option value="Auto">Auto</option>
                <option value="Manual">Manual</option>
              </select>
              <select
                value={formData.airConditioning}
                onChange={(e) =>
                  setFormData({ ...formData, airConditioning: e.target.value })
                }
                className="border mb-2 p-2 w-full"
              >
                <option value="Air Conditioning">Air Conditioning</option>
                <option value="No Air Conditioning">No Air Conditioning</option>
              </select>
              <select
                value={formData.doors}
                onChange={(e) =>
                  setFormData({ ...formData, doors: e.target.value })
                }
                className="border mb-2 p-2 w-full"
              >
                <option value="2">2 Doors</option>
                <option value="4">4 Doors</option>
              </select>
              <select
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
                className="border mb-2 p-2 w-full"
              >
                {[...Array(5)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Star{i > 0 ? "s" : ""}
                  </option>
                ))}
              </select>
              <input
                placeholder="Reviews"
                value={formData.reviews}
                onChange={(e) =>
                  setFormData({ ...formData, reviews: e.target.value })
                }
                className="border mb-2 p-2 w-full"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add Car
              </button>
              <button
                type="button"
                className="bg-red-500 text-white p-2 rounded ml-2"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between flex-wrap w-[1200px] mx-auto gap-7">
        {cars.slice(0, showAll ? cars.length : 4).map((car) => (
          <div
            key={car.id}
            className="car-card duration-300 w-[276px] bg-white p-4 rounded-[16px]"
          >
            <img
              src={car.image}
              alt={car.name}
              width={224}
              height={112}
              className="h-[112px] m-auto object-cover mb-[25px] rounded-[16px]"
            />
            <h3 className="text-[16px] font-medium text-[#262626] mb-3">
              {car.name}
            </h3>
            <div className="flex items-center mb-4">
              <img src={StarIcon} alt="star icon" width={16} height={16} />
              <p className="text-[12px] font-medium mx-[6px]">{car.rating}</p>
              <p className="text-[12px] text-[#959595]">
                ({car.reviews} reviews)
              </p>
            </div>
            <div className="flex gap-10 mb-2">
              <div className="flex items-center gap-1">
                <img src={PassengerIcon} alt="icon" width={20} height={20} />
                <p className="text-[12px] text-[#959595]">
                  {car.passengers} Passengers
                </p>
              </div>
              <div className="flex items-center gap-1">
                <img src={GearBoxIcon} alt="icon" width={20} height={20} />
                <p className="text-[12px] text-[#959595]">{car.transmission}</p>
              </div>
            </div>
            <div className="flex gap-[19px] mb-6">
              <div className="flex items-center gap-1">
                <img src={AirConIcon} alt="icon" width={20} height={20} />
                <p className="text-[12px] text-[#959595]">
                  {car.airConditioning}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <img src={DoorIcon} alt="icon" width={20} height={20} />
                <p className="text-[12px] text-[#959595]">{car.doors} Doors</p>
              </div>
            </div>
            <div className="h-[1px] w-full bg-[#E0E0E0] mb-6"></div>
            <div className="flex justify-between mb-6">
              <p className="text-[14px] text-[#595959]">Price</p>
              <div className="flex items-center">
                <p className="text-[16px] font-semibold text-[#292929]">
                  ${car.price}
                </p>
                <span className="text-[14px] text-[#959595]">/day</span>
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 py-[10px] w-full bg-[#1572D3] rounded-[8px] mb-2">
              <p className="text-[14px] font-medium text-white">Rent Now</p>
              <img src={ArrowIcon} alt="aroow icon" width={20} height={20} />
            </button>
            <button
              className="py-[10px] w-full bg-red-500 rounded-[8px] text-[14px] font-medium text-white"
              onClick={() => handleDelete(car.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        {cars.length > 4 && !showAll && (
          <button
            className="py-[19px] w-[216px] mt-[64px] m-auto text-[14px] text-[#4E4E4E] block font-meidum bg-transparent rounded-[8px] border-[2px] border-[#E0E0E0]"
            onClick={handleShowMore}
          >
            Show All Vehicles
          </button>
        )}
        {showAll && (
          <button
            className="py-[19px] w-[216px] m-auto text-[14px] text-[#4E4E4E] block font-meidum bg-transparent rounded-[8px] border-[2px] border-[#E0E0E0]"
            onClick={handleShowFewer}
          >
            Show Fewer
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
