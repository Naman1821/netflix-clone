// src/components/MyListRow.jsx
import React from "react";
import { useWatchlist } from "../context/WatchlistContext";
import MovieModal from "./MovieModal";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function MyListRow() {
    const { watchlist } = useWatchlist();
    const [selectedMovie, setSelectedMovie] = React.useState(null);
    const [trailerUrl, setTrailerUrl] = React.useState("");

    const handleClick = (movie) => {
        if (selectedMovie && selectedMovie.id === movie.id) {
            setSelectedMovie(null);
            setTrailerUrl("");
            return;
        }

        // Show modal without trailer (optional: you can fetch trailer too if needed)
        setSelectedMovie(movie);
        setTrailerUrl(""); // or fetch trailer with `movie-trailer`
    };

    if (watchlist.length === 0) return null; // hide if empty

    return (
        <div className="row">
            <h2>My List</h2>
            <div className="row__posters">
                {watchlist.map((movie) => (
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

export default MyListRow;
