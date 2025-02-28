import React, { useState, useRef, useEffect } from "react";

const SearchBar = ({ city, setCity, suggestions, fetchWeather, recentSearches, removeRecentSearch }) => {
    const inputRef = useRef(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        setCity(e.target.value);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion) => {
        fetchWeather(suggestion.name);
        setShowSuggestions(false);
    };

    const handleRecentSearchClick = (search) => {
        fetchWeather(search);
        setShowSuggestions(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchWeather(city);
        setShowSuggestions(false);
    };

    return (
        <div className="relative w-full max-w-md mx-auto mt-4" ref={inputRef}>
            <form onSubmit={handleFormSubmit} className="flex">
                <input
                    type="text"
                    value={city}
                    onChange={handleInputChange}
                    placeholder="Enter city name"
                    className="w-full p-2 border rounded-l-md"
                />
                <button
                    type="submit"
                    className="p-2 bg-red-500 text-white rounded-r-md hover:bg-red-800"
                >
                    Search
                </button>
            </form>
            {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
                <div className="absolute w-full mt-1 bg-white border rounded-md shadow-md z-10">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.name}, {suggestion.state}, {suggestion.country}
                        </div>
                    ))}
                    {recentSearches.length > 0 && (
                        <>
                            {suggestions.length > 0 && <hr />}
                            {recentSearches.map((search, index) => (
                                <div key={index} className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100">
                                    <span onClick={() => handleRecentSearchClick(search)}>{search}</span>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => removeRecentSearch(search)}
                                    >
                                        ✖
                                    </button>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;