import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const HourlyForecast = ({ city }) => {
    const [hourlyData, setHourlyData] = useState([]);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!city) return;

        const fetchHourlyForecast = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
                );
                const rawData = response.data.list;

                const processedData = rawData.slice(0, 9).map((item) => ({
                    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: "numeric" }),
                    temp: item.main.temp,
                    icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
                }));

                setHourlyData(processedData);
            } catch (error) {
                console.error("Error fetching forecast data", error);
            }
        };

        fetchHourlyForecast();
    }, [city]);

    useEffect(() => {
        if (!hourlyData.length) return;

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
                labels: hourlyData.map((data) => data.time),
                datasets: [{
                    label: "Temperature (°C)",
                    data: hourlyData.map((data) => data.temp),
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
                                const data = hourlyData[dataIndex];
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
    }, [hourlyData]);

    return (
        <div className="hourly-forecast-container" 
            style={{ 
                width: "95%", 
                maxWidth: "1200px", 
                margin: "20px auto", 
                textAlign: "center",
                background: "linear-gradient(135deg, rgba(123, 195, 147, 0.3), rgba(49, 183, 194, 0.3))" 
            }}
        >
            <h3>Hourly Forecast for {city}</h3>
            <div style={{ position: "relative", height: "300px" }}>
                <canvas ref={chartRef} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", marginTop: "20px" }}>
                {hourlyData.map((data, index) => (
                    <div key={index} className="hourly-forecast-item">
                        <p>{data.time}</p>
                        <img
                            src={data.icon}
                            alt="weather icon"
                            className="weather-icon"
                        />
                        <p>{data.temp}°C</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HourlyForecast;