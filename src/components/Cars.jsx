import { useState, useEffect } from "react";
import StarIcon from "../assets/images/star-icon.svg";
import PassengerIcon from "../assets/images/passengers-icon.svg";
import GearBoxIcon from "../assets/images/gearbox-icon.svg";
import AirConIcon from "../assets/images/air-con-icon.svg";
import DoorIcon from "../assets/images/door-icon.svg";
import ArrowIcon from "../assets/images/arrow-icon.svg";

const Cars = () => {
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
    const localCars = JSON.parse(localStorage.getItem("cars"));

    if (localCars) {
      setCars(localCars);
    } else {
      const response = await fetch("http://localhost:5000/cars");
      const data = await response.json();
      setCars(data);
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();

    const newCarData = { ...formData, image: formData.image };
    const existingCars = JSON.parse(localStorage.getItem("cars")) || [];
    existingCars.push(newCarData);
    localStorage.setItem("cars", JSON.stringify(existingCars));

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
        <div className="modal fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-4 rounded-[20px] w-[700px]">
            <h2 className="text-[35px] text-center font-bold mb-4">Add Car</h2>
            <form onSubmit={handleAddCar}>
              <div className="flex justify-between mb-2">
                <input
                  type="text"
                  placeholder="Car Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border mb-2 p-3 rounded-[8px] focus:border-blue-500 duration-300 focus:placeholder:text-blue-500 outline-none w-[49%]"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="border mb-2 p-3 rounded-[8px] focus:border-blue-500 duration-300 focus:placeholder:text-blue-500 outline-none w-[49%]"
                />
              </div>
              <div className="flex justify-between mb-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({
                        ...formData,
                        image: reader.result,
                      });
                    };
                    if (file) {
                      reader.readAsDataURL(file); // Convert to base64 string
                    }
                  }}
                  className="border mb-2 p-3 rounded-[8px] focus:border-blue-500 duration-300 focus:placeholder:text-blue-500 outline-none w-[49%]"
                />
                <select
                  value={formData.passengers}
                  onChange={(e) =>
                    setFormData({ ...formData, passengers: e.target.value })
                  }
                  className="border mb-2 p-3 rounded-[8px] focus:border-blue-500 duration-300 focus:placeholder:text-blue-500 outline-none w-[49%]"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Passenger{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between mb-2">
                <select
                  value={formData.transmission}
                  onChange={(e) =>
                    setFormData({ ...formData, transmission: e.target.value })
                  }
                  className="border mb-2 p-3 rounded-[8px] focus:border-blue-500 duration-300 focus:placeholder:text-blue-500 outline-none w-[49%]"
                >
                  <option value="Auto">Auto</option>
                  <option value="Manual">Manual</option>
                </select>
                <select
                  value={formData.airConditioning}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      airConditioning: e.target.value,
                    })
                  }
                  className="border mb-2 p-3 rounded-[8px] focus:border-blue-500 duration-300 focus:placeholder:text-blue-500 outline-none w-[49%]"
                >
                  <option value="Air Conditioning">Air Conditioning</option>
                  <option value="No Air Conditioning">
                    No Air Conditioning
                  </option>
                </select>
              </div>
              <div className="flex justify-between mb-2">
                <select
                  value={formData.doors}
                  onChange={(e) =>
                    setFormData({ ...formData, doors: e.target.value })
                  }
                  className="border mb-2 p-3 rounded-[8px] focus:border-blue-500 duration-300 focus:placeholder:text-blue-500 outline-none w-[49%]"
                >
                  <option value="2">2 Doors</option>
                  <option value="4">4 Doors</option>
                </select>
                <select
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                  className="border mb-2 p-3 rounded-[8px] focus:border-blue-500 duration-300 focus:placeholder:text-blue-500 outline-none w-[49%]"
                >
                  {[...Array(5)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Star{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <input
                placeholder="Reviews"
                value={formData.reviews}
                onChange={(e) =>
                  setFormData({ ...formData, reviews: e.target.value })
                }
                className="border block m-auto mb-4 p-3 rounded-[8px] focus:border-blue-500 duration-300 focus:placeholder:text-blue-500 outline-none w-[49%] "
              />
              <div className="flex justify-center gap-3">
                <button
                  type="submit"
                  className="bg-blue-500 border-[2px] border-transparent hover:border-blue-500 duration-300 hover:bg-white hover:text-blue-500 text-white py-3 w-[200px] rounded-[10px]"
                >
                  Add Car
                </button>
                <button
                  type="button"
                  className="bg-red-500 border-[2px] border-transparent hover:border-red-500 duration-300 hover:bg-white hover:text-red-500 text-white py-3 w-[200px] rounded-[10px]"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex  flex-wrap w-[1200px] mx-auto gap-7">
        {cars.slice(0, showAll ? cars.length : 4).map((car) => (
          <div
            key={car.id}
            className="car-card duration-300 w-[276px] bg-white p-4 rounded-[16px]"
          >
            <img
              src={car.image || ""}
              alt={car.name}
              width={234}
              height={120}
              className="h-[120px] m-auto object-cover mb-[25px] rounded-[16px]"
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

export default Cars;
