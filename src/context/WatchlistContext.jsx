// // src/context/WatchlistContext.js
// import React, { createContext, useContext, useState } from "react";

// const WatchlistContext = createContext();

// export const useWatchlist = () => useContext(WatchlistContext);

// export const WatchlistProvider = ({ children }) => {
//     const [watchlist, setWatchlist] = useState([]);

//     const addToWatchlist = (movie) => {
//         if (!watchlist.find((m) => m.id === movie.id)) {
//             setWatchlist([...watchlist, movie]);
//         }
//     };

//     const removeFromWatchlist = (id) => {
//         setWatchlist(watchlist.filter((movie) => movie.id !== id));
//     };

//     return (
//         <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
//             {children}
//         </WatchlistContext.Provider>
//     );
// };

// src/context/WatchlistContext.js
import React, { createContext, useContext, useState } from "react";

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    const addToWatchlist = (movie) => {
        if (!watchlist.find((m) => m.id === movie.id)) {
            setWatchlist([...watchlist, movie]);
        }
    };

    const removeFromWatchlist = (input) => {
        const id = typeof input === "object" ? input.id : input;
        setWatchlist(watchlist.filter((movie) => movie.id !== id));
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};
