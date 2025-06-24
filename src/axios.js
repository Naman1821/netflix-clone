// import axios from "axios";
// axios.get('https://api.example.com') // ✅ This will work
//     .then(response => console.log(response))
//     .catch(error => console.error(error));
// const instance = axios.create({
//     baseURL: "",
// });

// export default instance;
// src/axios.js
import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default instance;
