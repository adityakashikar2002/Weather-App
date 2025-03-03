// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import SearchBar from "./SearchBar";
// import WeatherDisplay from "./WeatherDisplay";
// import HourlyForecast from "./HourlyForecast";
// import FiveDayForecast from "./FiveDayForecast";


// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// const GEO_API = "https://api.openweathermap.org/geo/1.0/direct";

// const Weather = () => {
//     const [city, setCity] = useState("Pune, Maharashtra, India");
//     const [suggestions, setSuggestions] = useState([]);
//     const [weatherData, setWeatherData] = useState(null);
//     const [recentSearches, setRecentSearches] = useState(() => {
//         const savedSearches = localStorage.getItem('recentSearches');
//         return savedSearches ? JSON.parse(savedSearches) : ["Pune, Maharashtra, India"];
//     });
//     const [fiveDayForecast, setFiveDayForecast] = useState([]);

//     useEffect(() => {
//         localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
//     }, [recentSearches]);

//     useEffect(() => {
//         if (city.length > 2) {
//             axios
//                 .get(`${GEO_API}?q=${city}&limit=5&appid=${API_KEY}`)
//                 .then((res) => setSuggestions(res.data))
//                 .catch((err) => console.error("Error fetching suggestions", err));
//         } else {
//             setSuggestions([]);
//         }
//     }, [city]);

//     useEffect(() => {
//         fetchWeather("Pune, Maharashtra, India");
//     }, []);

//     const fetchWeather = async (selectedCity) => {
//         try {
//             const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=${API_KEY}`);
//             setWeatherData(weatherResponse.data);
//             setCity(selectedCity);
//             setSuggestions([]);
//             setRecentSearches((prev) => [...new Set([selectedCity, ...prev])].slice(0, 5));

//             const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&appid=${API_KEY}`);

//             const dailyData = [];
//             const usedDates = new Set();
//             forecastResponse.data.list.forEach((item) => {
//                 const date = new Date(item.dt * 1000).toLocaleDateString();
//                 if (!usedDates.has(date)) {
//                     usedDates.add(date);
//                     dailyData.push({
//                         date,
//                         temp: item.main.temp,
//                         condition: item.weather[0].main,
//                         icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
//                     });
//                 }
//             });
//             setFiveDayForecast(dailyData.slice(0, 5));
//         } catch (error) {
//             console.error("Error fetching weather data", error);
//         }
//     };

//     const removeRecentSearch = (cityToRemove) => {
//         setRecentSearches(recentSearches.filter(city => city !== cityToRemove));
//     };
    
//     return (
//         <div className="w-full">
//             <div >
//                 <SearchBar
//                     city={city}
//                     setCity={setCity}
//                     suggestions={suggestions}
//                     fetchWeather={fetchWeather}
//                     recentSearches={recentSearches}
//                     removeRecentSearch={removeRecentSearch}
//                 />
                
                    
//                 <WeatherDisplay weatherData={weatherData} />
//                 <HourlyForecast city={city} />
//                 <FiveDayForecast fiveDayForecast={fiveDayForecast} city={city} />
                    
//             </div>
//         </div>
//     );
// };

// export default Weather;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import SearchBar from "./SearchBar";
// import WeatherDisplay from "./WeatherDisplay";
// import HourlyForecast from "./HourlyForecast";
// import FiveDayForecast from "./FiveDayForecast";

// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
// const GEO_API = "https://api.openweathermap.org/geo/1.0/direct";

// const Weather = () => {
//     const [city, setCity] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const [weatherData, setWeatherData] = useState(null);
//     const [recentSearches, setRecentSearches] = useState(() => {
//         const savedSearches = localStorage.getItem('recentSearches');
//         return savedSearches ? JSON.parse(savedSearches) : [];
//     });
//     const [fiveDayForecast, setFiveDayForecast] = useState([]);

//     useEffect(() => {
//         localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
//     }, [recentSearches]);

//     useEffect(() => {
//         if (city.length > 2) {
//             axios
//                 .get(`${GEO_API}?q=${city}&limit=5&appid=${API_KEY}`)
//                 .then((res) => setSuggestions(res.data))
//                 .catch((err) => console.error("Error fetching suggestions", err));
//         } else {
//             setSuggestions([]);
//         }
//     }, [city]);

//     const fetchWeather = async (selectedCity) => {
//         if (!selectedCity) {
//             alert("Please enter a city name.");
//             return;
//         }
//         try {
//             const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=${API_KEY}`);
//             setWeatherData(weatherResponse.data);
//             setCity(selectedCity);
//             setSuggestions([]);
//             setRecentSearches((prev) => [...new Set([selectedCity, ...prev])].slice(0, 5));

//             const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&appid=${API_KEY}`);

//             const dailyData = [];
//             const usedDates = new Set();
//             forecastResponse.data.list.forEach((item) => {
//                 const date = new Date(item.dt * 1000).toLocaleDateString();
//                 if (!usedDates.has(date)) {
//                     usedDates.add(date);
//                     dailyData.push({
//                         date,
//                         temp: item.main.temp,
//                         condition: item.weather[0].main,
//                         icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
//                     });
//                 }
//             });
//             setFiveDayForecast(dailyData.slice(0, 5));
//         } catch (error) {
//             console.error("Error fetching weather data", error);
//             alert("Could not find weather data for the entered city.");
//         }
//     };

//     const removeRecentSearch = (cityToRemove) => {
//         setRecentSearches(recentSearches.filter(city => city !== cityToRemove));
//     };

//     return (
//         <div className="w-full">
//             <div>
//                 <SearchBar
//                     city={city}
//                     setCity={setCity}
//                     suggestions={suggestions}
//                     fetchWeather={fetchWeather}
//                     recentSearches={recentSearches}
//                     removeRecentSearch={removeRecentSearch}
//                 />
//                 {weatherData && (
//                     <>
//                         <WeatherDisplay weatherData={weatherData} />
//                         <HourlyForecast city={city} />
//                         <FiveDayForecast fiveDayForecast={fiveDayForecast} city={city} />
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Weather;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import SearchBar from "./SearchBar"; // Assuming you have a SearchBar component
// import WeatherDisplay from "./WeatherDisplay";
// import HourlyForecast from "./HourlyForecast";
// import FiveDayForecast from "./FiveDayForecast";

// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
// const GEO_API = "https://api.openweathermap.org/geo/1.0/direct";

// const Weather = () => {
//     const [city, setCity] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const [weatherData, setWeatherData] = useState(null);
//     const [recentSearches, setRecentSearches] = useState(() => {
//         const savedSearches = localStorage.getItem('recentSearches');
//         return savedSearches ? JSON.parse(savedSearches) : [];
//     });
//     const [fiveDayForecast, setFiveDayForecast] = useState([]);

//     useEffect(() => {
//         const fetchUserLocation = () => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(
//                     (position) => {
//                         const { latitude, longitude } = position.coords;
//                         fetchWeatherByCoords(latitude, longitude);
//                     },
//                     (error) => {
//                         console.error("Error getting location:", error);
//                         alert("Could not retrieve your location. Please enable location services.");
//                     }
//                 );
//             } else {
//                 alert("Geolocation is not supported by this browser.");
//             }
//         };

//         fetchUserLocation();
//         localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
//     }, [recentSearches]);

//     useEffect(() => {
//         if (city.length > 2) {
//             axios
//                 .get(`${GEO_API}?q=${city}&limit=5&appid=${API_KEY}`)
//                 .then((res) => setSuggestions(res.data))
//                 .catch((err) => console.error("Error fetching suggestions", err));
//         } else {
//             setSuggestions([]);
//         }
//     }, [city]);

//     const fetchWeather = async (selectedCity) => {
//         if (!selectedCity) {
//             alert("Please enter a city name.");
//             return;
//         }
//         try {
//             const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=${API_KEY}`);
//             setWeatherData(weatherResponse.data);
//             setCity(selectedCity);
//             setSuggestions([]);
//             setRecentSearches((prev) => [...new Set([selectedCity, ...prev])].slice(0, 5));

//             const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&appid=${API_KEY}`);

//             const dailyData = [];
//             const usedDates = new Set();
//             forecastResponse.data.list.forEach((item) => {
//                 const date = new Date(item.dt * 1000).toLocaleDateString();
//                 if (!usedDates.has(date)) {
//                     usedDates.add(date);
//                     dailyData.push({
//                         date,
//                         temp: item.main.temp,
//                         condition: item.weather[0].main,
//                         icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
//                     });
//                 }
//             });
//             setFiveDayForecast(dailyData.slice(0, 5));
//         } catch (error) {
//             console.error("Error fetching weather data", error);
//             alert("Could not find weather data for the entered city.");
//         }
//     };

//     const fetchWeatherByCoords = async (latitude, longitude) => {
//         try {
//             const weatherResponse = await axios.get(
//                 `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
//             );
//             setWeatherData(weatherResponse.data);
//             setCity(weatherResponse.data.name);

//             const forecastResponse = await axios.get(
//                 `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
//             );

//             const dailyData = [];
//             const usedDates = new Set();
//             forecastResponse.data.list.forEach((item) => {
//                 const date = new Date(item.dt * 1000).toLocaleDateString();
//                 if (!usedDates.has(date)) {
//                     usedDates.add(date);
//                     dailyData.push({
//                         date,
//                         temp: item.main.temp,
//                         condition: item.weather[0].main,
//                         icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
//                     });
//                 }
//             });
//             setFiveDayForecast(dailyData.slice(0, 5));

//         } catch (error) {
//             console.error("Error fetching weather data", error);
//             alert("Could not fetch weather data for your location.");
//         }
//     };

//     const removeRecentSearch = (cityToRemove) => {
//         setRecentSearches(recentSearches.filter(city => city !== cityToRemove));
//     };

//     return (
//         <div className="w-full">
//             <div>
//                 <SearchBar
//                     city={city}
//                     setCity={setCity}
//                     suggestions={suggestions}
//                     fetchWeather={fetchWeather}
//                     recentSearches={recentSearches}
//                     removeRecentSearch={removeRecentSearch}
//                 />
//                 {weatherData && (
//                     <>
//                         <WeatherDisplay weatherData={weatherData} />
//                         <HourlyForecast city={city} />
//                         <FiveDayForecast fiveDayForecast={fiveDayForecast} city={city} />
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Weather;

import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar"; 
import WeatherDisplay from "./WeatherDisplay";
import HourlyForecast from "./HourlyForecast";
import FiveDayForecast from "./FiveDayForecast";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const GEO_API = "https://api.openweathermap.org/geo/1.0/direct";

const Weather = () => {
    const [city, setCity] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [recentSearches, setRecentSearches] = useState(() => {
        const savedSearches = localStorage.getItem("recentSearches");
        return savedSearches ? JSON.parse(savedSearches) : [];
    });
    const [fiveDayForecast, setFiveDayForecast] = useState([]);

    useEffect(() => {
        const fetchUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeatherByCoords(latitude, longitude);
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                        alert("Could not retrieve your location. Please enable location services.");
                    }
                );
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        };
        fetchUserLocation();
    }, []);

    // Store recent searches in localStorage whenever it updates
    useEffect(() => {
        localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }, [recentSearches]);

    useEffect(() => {
        if (city.length > 2) {
            axios
                .get(`${GEO_API}?q=${city}&limit=5&appid=${API_KEY}`)
                .then((res) => setSuggestions(res.data))
                .catch((err) => console.error("Error fetching suggestions", err));
        } else {
            setSuggestions([]);
        }
    }, [city]);

    const fetchWeather = async (selectedCity) => {
        if (!selectedCity) {
            alert("Please enter a city name.");
            return;
        }
        try {
            const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=${API_KEY}`
            );
            setWeatherData(weatherResponse.data);
            setCity(selectedCity);
            setSuggestions([]);

            // Update recent searches without duplicates
            setRecentSearches((prev) => {
                const updatedSearches = [selectedCity, ...prev.filter((c) => c !== selectedCity)];
                return updatedSearches.slice(0, 5);
            });

            // Fetch 5-day forecast
            const forecastResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&appid=${API_KEY}`
            );

            const dailyData = [];
            const usedDates = new Set();
            forecastResponse.data.list.forEach((item) => {
                const date = new Date(item.dt * 1000).toLocaleDateString();
                if (!usedDates.has(date)) {
                    usedDates.add(date);
                    dailyData.push({
                        date,
                        temp: item.main.temp,
                        condition: item.weather[0].main,
                        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
                    });
                }
            });
            setFiveDayForecast(dailyData.slice(0, 5));
        } catch (error) {
            console.error("Error fetching weather data", error);
            alert("Could not find weather data for the entered city.");
        }
    };

    const fetchWeatherByCoords = async (latitude, longitude) => {
        try {
            const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
            );
            setWeatherData(weatherResponse.data);
            setCity(weatherResponse.data.name);

            const forecastResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
            );

            const dailyData = [];
            const usedDates = new Set();
            forecastResponse.data.list.forEach((item) => {
                const date = new Date(item.dt * 1000).toLocaleDateString();
                if (!usedDates.has(date)) {
                    usedDates.add(date);
                    dailyData.push({
                        date,
                        temp: item.main.temp,
                        condition: item.weather[0].main,
                        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
                    });
                }
            });
            setFiveDayForecast(dailyData.slice(0, 5));
        } catch (error) {
            console.error("Error fetching weather data", error);
            alert("Could not fetch weather data for your location.");
        }
    };

    const removeRecentSearch = (cityToRemove) => {
        setRecentSearches(recentSearches.filter((city) => city !== cityToRemove));
    };

    return (
        <div className="w-full">
            <SearchBar
                city={city}
                setCity={setCity}
                suggestions={suggestions}
                fetchWeather={fetchWeather}
                recentSearches={recentSearches}
                removeRecentSearch={removeRecentSearch}
            />
            {weatherData && (
                <>
                    <WeatherDisplay weatherData={weatherData} />
                    <HourlyForecast city={city} />
                    <FiveDayForecast fiveDayForecast={fiveDayForecast} city={city} />
                </>
            )}
        </div>
    );
};

export default Weather;

