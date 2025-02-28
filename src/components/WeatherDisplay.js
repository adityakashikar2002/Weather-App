import React from "react";
import { motion } from "framer-motion";
import {
    WiHumidity,
    WiStrongWind,
    WiDaySunny,
    WiThermometer,
    WiBarometer,
    WiSnow,
    WiSunrise,
    WiSunset,
} from "react-icons/wi";

const WeatherDisplay = ({ weatherData }) => {
    if (!weatherData) return null;

    const sunriseTime = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunsetTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-6 text-center text-white weather-display-container"
        >
            {/* Current Weather Section with Grid */}
            <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 rounded-lg p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Main Weather Info */}
                <div className="flex flex-col items-start">
                    <div className="flex justify-between items-start w-full">
                        <div>
                            <h2 className="text-lg font-semibold">Current weather</h2>
                            <p className="text-sm">{currentTime}</p>
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <WiDaySunny className="text-6xl mr-4" />
                        <div>
                            <h1 className="text-5xl font-bold">{weatherData.main.temp}°C</h1>
                            <p className="text-lg">{weatherData.weather[0].main}</p>
                            <p className="text-sm">Feels like {weatherData.main.feels_like}°C</p>
                        </div>
                    </div>
                    <p className="mt-4 text-left">Expect sunny skies. The high will be {Math.round(weatherData.main.temp_max)}°.</p>
                </div>

                {/* Grid of Weather Properties */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <motion.div
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.05 }}
                        title="Air Quality"
                    >
                        <WiThermometer className="text-2xl" />
                        <div>
                            <p className="text-sm">Air quality</p>
                            <p className="font-semibold">{weatherData.main.pressure} Pm</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.05 }}
                        title="Wind"
                    >
                        <WiStrongWind className="text-2xl" />
                        <div>
                            <p className="text-sm">Wind</p>
                            <p className="font-semibold">{weatherData.wind.speed} km/h</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-lg hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.05 }}
                        title="Humidity"
                    >
                        <WiHumidity className="text-2xl" />
                        <div>
                            <p className="text-sm">Humidity</p>
                            <p className="font-semibold">{weatherData.main.humidity}%</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-lg hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.05 }}
                        title="Visibility"
                    >
                        <WiSnow className="text-2xl" />
                        <div>
                            <p className="text-sm">Visibility</p>
                            <p className="font-semibold">{weatherData.visibility / 1000} km</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.05 }}
                        title="Pressure"
                    >
                        <WiBarometer className="text-2xl" />
                        <div>
                            <p className="text-sm">Pressure</p>
                            <p className="font-semibold">{weatherData.main.pressure} hPa</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-indigo-600 p-3 rounded-lg hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.05 }}
                        title="Dew Point"
                    >
                        <WiSnow className="text-2xl" />
                        <div>
                            <p className="text-sm">Dew point</p>
                            <p className="font-semibold">{Math.round(weatherData.main.temp - (100 - weatherData.main.humidity) / 5)}°C</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-lg hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.05 }}
                        title="Sunrise"
                    >
                        <WiSunrise className="text-2xl" />
                        <div>
                            <p className="text-sm">Sunrise</p>
                            <p className="font-semibold">{sunriseTime}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex items-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 p-3 rounded-lg hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.05 }}
                        title="Sunset"
                    >
                        <WiSunset className="text-2xl" />
                        <div>
                            <p className="text-sm">Sunset</p>
                            <p className="font-semibold">{sunsetTime}</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default WeatherDisplay;