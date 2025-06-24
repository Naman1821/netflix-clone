// src/components/MovieCard.jsx
import React from "react";
import "./MovieCard.css";

function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
            />
            <p>{movie.title}</p>
        </div>
    );
}

export default MovieCard;
