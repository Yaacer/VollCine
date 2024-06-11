import { useEffect, useState, createContext, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api"; // Corrija o caminho conforme necessário

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  runtime: string;
  release_date: string;
  vote_average: number;
};

type MovieContextData = {
  favoriteMovies: number[];
  allFavoriteMovies: Movie[];
  addFavoriteMovies: (movieId: number) => void;
  removeFavoriteMovies: (movieId: number) => void;
};

export const MovieContext = createContext<MovieContextData>({
  favoriteMovies: [],
  allFavoriteMovies: [],
  addFavoriteMovies: () => {},
  removeFavoriteMovies: () => {},
});

type MovieProviderProps = {
  children: React.ReactNode;
};

export function MovieProvider({ children }: MovieProviderProps) {
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>([]);
  const [allFavoriteMovies, setAllFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadFavoriteMovies() {
      const storedFavoriteMovies = await AsyncStorage.getItem("@FavoriteMovies");
      if (storedFavoriteMovies) {
        const favoriteMoviesIds = JSON.parse(storedFavoriteMovies);
        setFavoriteMovies(favoriteMoviesIds);
        fetchFavoriteMoviesDetails(favoriteMoviesIds);
      }
    }

    loadFavoriteMovies();
  }, []);

  const fetchFavoriteMoviesDetails = async (movieIds: number[]) => {
    try {
      const movieDetails = await Promise.all(
        movieIds.map((id) => api.get(`/movie/${id}`).then((res) => res.data))
      );
      setAllFavoriteMovies(movieDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const addFavoriteMovies = useCallback(
    async (movieId: number) => {
      if (!favoriteMovies.includes(movieId)) {
        const newFavoriteMovies = [...favoriteMovies, movieId];
        setFavoriteMovies(newFavoriteMovies);
        await AsyncStorage.setItem("@FavoriteMovies", JSON.stringify(newFavoriteMovies));
        fetchFavoriteMoviesDetails(newFavoriteMovies);
      }
    },
    [favoriteMovies]
  );

  const removeFavoriteMovies = useCallback(
    async (movieId: number) => {
      const newFavoriteMovies = favoriteMovies.filter((id) => id !== movieId);
      setFavoriteMovies(newFavoriteMovies);
      await AsyncStorage.setItem("@FavoriteMovies", JSON.stringify(newFavoriteMovies));
      fetchFavoriteMoviesDetails(newFavoriteMovies);
    },
    [favoriteMovies]
  );

  const contextData: MovieContextData = {
    favoriteMovies,
    allFavoriteMovies,
    addFavoriteMovies,
    removeFavoriteMovies,
  };

  return (
    <MovieContext.Provider value={contextData}>
      {children}
    </MovieContext.Provider>
  );
}
