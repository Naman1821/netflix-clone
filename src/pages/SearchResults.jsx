// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "./SearchResults.css";

function SearchResults() {
    const [results, setResults] = useState([]);
    const { search } = useLocation();
    const query = new URLSearchParams(search).get("q");

    useEffect(() => {
        if (query) {
            axios
                .get(`/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${query}`)
                .then((res) => setResults(res.data.results || []));
        }
    }, [query]);

    return (
        <div className="search-results">
            <h2>Search Results for "{query}"</h2>
            <div className="results-grid">
                {results.length ? (
                    results.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
}

export default SearchResults;
