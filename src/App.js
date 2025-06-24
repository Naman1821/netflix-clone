// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Row from "./components/Row";
import requests from "./request";
import SearchBar from "./components/SearchBar";
import MyListRow from "./components/MyListRow";
import { WatchlistProvider } from "./context/WatchlistContext";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute"; // ✅ import

function HomePage() {
  return (
    <>
      <Navbar />
      <Banner />
      <SearchBar />
      <MyListRow />
      <hr className="section-divider" />
      <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now 🇮🇳 India" fetchUrl={requests.fetchTrendingIndian} />
      <Row title="Indian TV Shows" fetchUrl={requests.fetchIndianShows} />
      <Row title="Indian Movies" fetchUrl={requests.fetchIndianMovies} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <Router>
          <div style={{ backgroundColor: "#111", minHeight: "100vh", margin: 0, padding: 0 }}>
            <Routes>
              <Route path="/login" element={<Login />} />

              {/* ✅ Protect homepage */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </WatchlistProvider>
    </AuthProvider>
  );
}

export default App;
