// RecentSearches.js
import React from "react";

const RecentSearches = ({ recentSearches, fetchWeather, removeRecentSearch }) => {
    return (
        <div className="w-1/4 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Recent Searches</h2>
            <ul>
                {recentSearches.map((search, index) => (
                    <li key={index} className="flex justify-between items-center py-2 px-3 bg-gray-100 rounded-lg mb-2">
                        <span className="cursor-pointer" onClick={() => fetchWeather(search)}>
                            {search}
                        </span>
                        <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeRecentSearch(search)}
                        >
                            ✖
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentSearches;