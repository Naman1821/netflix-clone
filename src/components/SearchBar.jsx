// components/SearchBar.jsx
import React, { useState, useEffect } from "react";
import axios from "../axios";
import movieTrailer from "movie-trailer";
import MovieModal from "./MovieModal";
import "./SearchBar.css"; // ✅ create this file for styles
import "./Row.css"; // ✅ reuse poster layout

const base_url = "https://image.tmdb.org/t/p/original/";

function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim() !== "") {
                searchMovies(query);
            } else {
                setResults([]);
            }
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [query]);

    const searchMovies = async (term) => {
        try {
            const res = await axios.get(`/search/movie?query=${term}&api_key=daldi jo meri h`);
            setResults(res.data.results);
        } catch (error) {
            console.error("Search failed", error);
        }
    };

    const handleClick = (movie) => {
        if (selectedMovie && selectedMovie.id === movie.id) {
            setSelectedMovie(null);
            setTrailerUrl("");
            return;
        }

        movieTrailer(movie?.title || movie?.name || movie?.original_title || movie?.original_name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
                setSelectedMovie(movie);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="search__container">
            <input
                type="text"
                placeholder="Search for movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search__input" // ✅ Styled in CSS
            />

            {results.length > 0 && <h2 className="search__title">Search Results</h2>}

            <div className="row__posters">
                {results.map((movie) => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className="row__poster"
                        src={`${base_url}${movie.backdrop_path || movie.poster_path}`}
                        alt={movie.title}
                    />
                ))}
            </div>

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    trailerUrl={trailerUrl}
                    onClose={() => {
                        setSelectedMovie(null);
                        setTrailerUrl("");
                    }}
                />
            )}
        </div>
    );
}

export default SearchBar;
