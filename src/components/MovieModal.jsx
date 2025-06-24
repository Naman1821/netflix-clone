
// src/components/MovieModal.jsx
import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { useWatchlist } from "../context/WatchlistContext";
import "./MovieModal.css";

function MovieModal({ movie, trailerUrl, onClose }) {
    const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
    const isInWatchlist = watchlist.some((m) => m.id === movie.id);
    const playerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
            playerRef.current?.internalPlayer?.stopVideo();
        };
    }, [onClose]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: { autoplay: 0 },
    };

    return (
        <div className="modal__overlay" onClick={onClose}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <span className="modal__close" onClick={onClose}>❌</span>
                <h2 className="modal__title">{movie?.title || movie?.name}</h2>
                <p className="modal__desc">{movie?.overview}</p>

                {trailerUrl ? (
                    <>
                        {isLoading && <p style={{ color: "#fff" }}>Loading trailer...</p>}
                        <YouTube
                            videoId={trailerUrl}
                            opts={opts}
                            ref={playerRef}
                            onReady={() => setIsLoading(false)}
                        />
                    </>
                ) : (
                    <p style={{ color: "#fff" }}>No trailer found.</p>
                )}

                <button
                    onClick={() =>
                        isInWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)
                    }
                    style={{
                        marginTop: "15px",
                        padding: "10px 20px",
                        backgroundColor: isInWatchlist ? "#ff4444" : "#00cc66",
                        color: "white",
                        borderRadius: "5px",
                        fontWeight: "bold",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                </button>
            </div>
        </div>
    );
}

export default MovieModal;
