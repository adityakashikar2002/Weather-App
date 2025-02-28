import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";


const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const FiveDayForecast = ({ fiveDayForecast, city }) => {
    const [selectedDayForecast, setSelectedDayForecast] = useState(null);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const handleDayClick = async (date) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
            );
            const hourlyData = response.data.list
                .filter((item) => new Date(item.dt * 1000).toLocaleDateString() === date)
                .map((item) => ({
                    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: "numeric" }),
                    temp: item.main.temp,
                    icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
                    condition: item.weather[0].main,
                }));

            setSelectedDayForecast(hourlyData);
        } catch (error) {
            console.error("Error fetching hourly forecast", error);
        }
    };

    useEffect(() => {
        if (!selectedDayForecast || !selectedDayForecast.length) return;

        const ctx = chartRef.current.getContext("2d");

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, "rgba(255, 99, 132, 0.2)");
        gradient.addColorStop(0.25, "rgba(255, 165, 0, 0.2)");
        gradient.addColorStop(0.5, "rgba(255, 255, 0, 0.2)");
        gradient.addColorStop(0.75, "rgba(0, 255, 0, 0.2)");
        gradient.addColorStop(1, "rgba(0, 191, 255, 0.2)");

        chartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: selectedDayForecast.map((data) => data.time),
                datasets: [{
                    label: "Temperature (°C)",
                    data: selectedDayForecast.map((data) => data.temp),
                    fill: true,
                    backgroundColor: gradient,
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: "red",
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            color: "black",
                        },
                        grid: {
                            display: false,
                        },
                    },
                    x: {
                        ticks: {
                            color: "black",
                        },
                        grid: {
                            display: false,
                        },
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const dataIndex = context.dataIndex;
                                const data = selectedDayForecast[dataIndex];
                                return `Temperature: ${data.temp}°C`;
                            }
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [selectedDayForecast]);

    return (
        <div className="five-day-forecast-container rounded-lg p-6 shadow-md "> {/* Added bg-white and rounded-lg */}
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">5-Day Forecast</h2>
            <div className="flex justify-around">
                {fiveDayForecast.map((day, index) => (
                    <div
                        key={index}
                        className="five-day-forecast-item cursor-pointer p-4 rounded shadow-md hover:shadow-lg transition duration-300"
                        onClick={() => handleDayClick(day.date)}
                        style={{ backgroundColor: 'rgba(248, 207, 235, 0.8)'  }} // Added inline background color
                    >
                        <p className="font-semibold">{day.date}</p>
                        <img src={day.icon} alt="Weather Icon" className="weather-icon mx-auto my-2" />
                        <p>{day.temp}°C</p>
                        <p className="text-sm text-gray-600">{day.condition}</p>
                    </div>
                ))}
            </div>

            {selectedDayForecast && selectedDayForecast.length > 0 && (
                <div className="mt-6">
                    <div style={{ position: "relative", height: "300px" }}>
                        <canvas ref={chartRef} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FiveDayForecast;