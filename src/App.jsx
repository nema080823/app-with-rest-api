import React, { useState } from "react";

// Mock Weather Data
const mockWeatherData = [
  { id: 1, city: "New York", temperature: 23, condition: "Sunny" },
  { id: 2, city: "Los Angeles", temperature: 30, condition: "Clear" },
  { id: 3, city: "London", temperature: 18, condition: "Cloudy" },
];

function App() {
  const [weatherData, setWeatherData] = useState(mockWeatherData);
  const [newCity, setNewCity] = useState("");
  const [newTemperature, setNewTemperature] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [editCity, setEditCity] = useState(null);
  const [editTemperature, setEditTemperature] = useState("");
  const [editCondition, setEditCondition] = useState("");

  // Determine background color based on weather condition
  const getBackgroundColor = (condition) => {
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return "bg-yellow-300";
      case "cloudy":
        return "bg-gray-400";
      case "rainy":
        return "bg-blue-400";
      case "snowy":
        return "bg-blue-200";
      default:
        return "bg-gray-50";
    }
  };

  // Add a new weather entry
  const handleAddWeather = () => {
    if (newCity && newTemperature && newCondition) {
      const newWeather = {
        id: weatherData.length + 1,
        city: newCity,
        temperature: parseInt(newTemperature),
        condition: newCondition,
      };
      setWeatherData([...weatherData, newWeather]);
      setNewCity("");
      setNewTemperature("");
      setNewCondition("");
    }
  };

  // Edit weather entry
  const handleEditWeather = (id) => {
    const weatherToEdit = weatherData.find((item) => item.id === id);
    setEditCity(weatherToEdit.city);
    setEditTemperature(weatherToEdit.temperature);
    setEditCondition(weatherToEdit.condition);
  };

  // Save the edited weather data
  const handleSaveEdit = () => {
    setWeatherData(
      weatherData.map((item) =>
        item.city === editCity
          ? { ...item, temperature: editTemperature, condition: editCondition }
          : item
      )
    );
    setEditCity(null);
    setEditTemperature("");
    setEditCondition("");
  };

  // Delete a weather entry
  const handleDeleteWeather = (id) => {
    setWeatherData(weatherData.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700">Weather App</h1>

        {/* Add New Weather Form */}
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New City Weather</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="City Name"
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
            />
            <input
              type="number"
              placeholder="Temperature (°C)"
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newTemperature}
              onChange={(e) => setNewTemperature(e.target.value)}
            />
            <input
              type="text"
              placeholder="Weather Condition"
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newCondition}
              onChange={(e) => setNewCondition(e.target.value)}
            />
            <button
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              onClick={handleAddWeather}
            >
              Add Weather
            </button>
          </div>
        </div>

        {/* Weather Data List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Weather Data</h2>
          {weatherData.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 ${getBackgroundColor(
                item.condition
              )}`}
            >
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-indigo-600">{item.city}</span>
                <span className="text-sm text-gray-500">{item.temperature}°C - {item.condition}</span>
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
                  onClick={() => handleEditWeather(item.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                  onClick={() => handleDeleteWeather(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Weather Form */}
        {editCity && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Edit Weather for {editCity}</h2>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Temperature"
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editTemperature}
                onChange={(e) => setEditTemperature(e.target.value)}
              />
              <input
                type="text"
                placeholder="Condition"
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editCondition}
                onChange={(e) => setEditCondition(e.target.value)}
              />
              <div className="flex space-x-4">
                <button
                  className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
                  onClick={handleSaveEdit}
                >
                  Save Changes
                </button>
                <button
                  className="w-full py-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition"
                  onClick={() => setEditCity(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
