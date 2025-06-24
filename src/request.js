const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // Replace with your real TMDB key

const requests = {
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTrendingIndian: `/discover/movie?api_key=${API_KEY}&region=IN&sort_by=popularity.desc&with_original_language=hi`,
    fetchIndianShows: `/discover/tv?api_key=${API_KEY}&with_origin_country=IN`,
    fetchIndianMovies: `/discover/movie?api_key=${API_KEY}&with_origin_country=IN`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    // fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&region=IN&with_original_language=hi&sort_by=popularity.desc`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,


}

export default requests;
