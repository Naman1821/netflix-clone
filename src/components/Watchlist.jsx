// src/components/Watchlist.jsx
import React from "react";
import { useWatchlist } from "../context/WatchlistContext";
import "./Row.css"; // reuse styles

const base_url = "https://image.tmdb.org/t/p/original/";

function Watchlist() {
    const { watchlist } = useWatchlist();

    return (
        <div className="row">
            <h2>Your Watchlist</h2>
            <div className="row__posters">
                {watchlist.map((movie) => (
                    <img
                        key={movie.id}
                        className="row__poster"
                        src={`${base_url}${movie.backdrop_path || movie.poster_path}`}
                        alt={movie.title}
                    />
                ))}
            </div>
        </div>
    );
}

export default Watchlist;
