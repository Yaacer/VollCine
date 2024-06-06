import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "a634d294b7002b533fa9add06ef802b7",
    language: "pt-BR",
    include_adult: false,
  },
});
