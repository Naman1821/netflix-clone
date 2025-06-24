// import React, { useEffect, useState } from "react";
// import "./Banner.css";

// function Banner() {
//     const [movie, setMovie] = useState({});

//     // Fake movie data — API later
//     useEffect(() => {
//         setMovie({
//             title: "Stranger Things",
//             overview:
//                 "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
//             backdrop_path:
//                 "/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg", // from TMDB
//         });
//     }, []);

//     return (
//         <header
//             className="banner"
//             style={{
//                 backgroundSize: "cover",
//                 backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
//                 backgroundPosition: "center center",
//             }}
//         >
//             <div className="banner__contents">
//                 <h1 className="banner__title">{movie.title}</h1>
//                 <div className="banner__buttons">
//                     <button className="banner__button">Play</button>
//                     <button className="banner__button">My List</button>
//                 </div>
//                 <h1 className="banner__description">{movie.overview}</h1>
//             </div>
//             <div className="banner--fadeBottom" />
//         </header>
//     );
// }

// export default Banner;
import React, { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../request";
import "./Banner.css";
import { useWatchlist } from "../context/WatchlistContext"; // ✅ import watchlist context

function Banner() {
    const [movie, setMovie] = useState({});
    const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist(); // ✅ use context

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            const results = request.data.results;
            setMovie(results[Math.floor(Math.random() * results.length)]);
        }
        fetchData();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    // ✅ Toggle movie in/out of watchlist
    const handleWatchlistToggle = () => {
        if (watchlist.some((m) => m.id === movie.id)) {
            removeFromWatchlist(movie);
        } else {
            addToWatchlist(movie);
        }
    };

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: movie?.backdrop_path
                    ? `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`
                    : "url('https://via.placeholder.com/1500x500?text=No+Image')",
                backgroundPosition: "top center",
                height: "60vh",
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>

                    {/* ✅ Dynamic My List button */}
                    <button className="banner__button" onClick={handleWatchlistToggle}>
                        {watchlist.some((m) => m.id === movie.id)
                            ? "Remove from My List"
                            : "Add to My List"}
                    </button>
                </div>

                <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="banner--fadeBottom" />
        </header>
    );
}

export default Banner;

