
import React, { useEffect, useState, useRef } from "react";
import axios from "../axios";
import movieTrailer from "movie-trailer";
import MovieModal from "./MovieModal"; // 👈 add this
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null); // 👈 modal state
    const rowRef = useRef();

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            console.log(title, request.data.results);
            setMovies(request.data.results);
        }
        fetchData();
    }, [fetchUrl]);

    const scroll = (direction) => {
        const { current } = rowRef;
        const scrollAmount = direction * 300;
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    const handleClick = (movie) => {
        if (selectedMovie && selectedMovie.id === movie.id) {
            setSelectedMovie(null);
            setTrailerUrl("");
            return;
        }
        setSelectedMovie(movie);

        movieTrailer(movie?.name || movie?.title || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
                setSelectedMovie(movie); // 👈 open modal
            })
            .catch((error) => {
                console.log("No trailer found:", error);
                setTrailerUrl(""); // ✅ still open modal with fallback
            });
    };

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__container">
                <button className="scroll-btn left" onClick={() => scroll(-1)}>
                    ◀
                </button>

                <div className="row__posters" ref={rowRef}>
                    {movies.map((movie) => (
                        <img
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    ))}
                </div>

                <button className="scroll-btn right" onClick={() => scroll(1)}>
                    ▶
                </button>
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

export default Row;


