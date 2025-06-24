// src/components/GenreFilter.jsx
import React from "react";
import "./GenreFilter.css";

function GenreFilter({ genres, selectedGenre, onChange }) {
    return (
        <div className="genre-filter">
            <select value={selectedGenre} onChange={(e) => onChange(e.target.value)}>
                <option value="">All Genres</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default GenreFilter;
