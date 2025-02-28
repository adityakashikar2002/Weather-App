import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import WeatherDisplay from "./WeatherDisplay";
import HourlyForecast from "./HourlyForecast";
import FiveDayForecast from "./FiveDayForecast";


const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const GEO_API = "https://api.openweathermap.org/geo/1.0/direct";

const Weather = () => {
    const [city, setCity] = useState("Pune, Maharashtra, India");
    const [suggestions, setSuggestions] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [recentSearches, setRecentSearches] = useState(() => {
        const savedSearches = localStorage.getItem('recentSearches');
        return savedSearches ? JSON.parse(savedSearches) : ["Pune, Maharashtra, India"];
    });
    const [fiveDayForecast, setFiveDayForecast] = useState([]);

    useEffect(() => {
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
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

    useEffect(() => {
        fetchWeather("Pune, Maharashtra, India");
    }, []);

    const fetchWeather = async (selectedCity) => {
        try {
            const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=${API_KEY}`);
            setWeatherData(weatherResponse.data);
            setCity(selectedCity);
            setSuggestions([]);
            setRecentSearches((prev) => [...new Set([selectedCity, ...prev])].slice(0, 5));

            const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&appid=${API_KEY}`);

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
        }
    };

    const removeRecentSearch = (cityToRemove) => {
        setRecentSearches(recentSearches.filter(city => city !== cityToRemove));
    };
    
    return (
        <div className="w-full">
            <div >
                <SearchBar
                    city={city}
                    setCity={setCity}
                    suggestions={suggestions}
                    fetchWeather={fetchWeather}
                    recentSearches={recentSearches}
                    removeRecentSearch={removeRecentSearch}
                />
                
                    
                <WeatherDisplay weatherData={weatherData} />
                <HourlyForecast city={city} />
                <FiveDayForecast fiveDayForecast={fiveDayForecast} city={city} />
                    
            </div>
        </div>
    );
};

export default Weather;