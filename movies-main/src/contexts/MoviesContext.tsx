import { useState, createContext, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Movie = {
    id: number;
    title: string;
    poster_path: string;
    runtime: string;
    release_date: string;
    vote_average;
}

type MovieContextData = {
    favoriteMovies: number[];
    allFavoriteMovies: Movie[];
    addFavoriteMovies: (movieId: number) => void
    removeFavoriteMovies: (movieId: number) => void
}

export const MovieContext = createContext<MovieContextData>({
    favoriteMovies: [],
    allFavoriteMovies: [],
    addFavoriteMovies: () => { },
    removeFavoriteMovies: () => { },
})

type MovieProvidesProps = {
    children: React.ReactNode;
}

export function MovieProvider({ children }: MovieProvidesProps) {
    const [favoriteMovies, setFavoriteMovies] = useState<number[]>([]);
    const [allFavoriteMovies, setAllFavoriteMovies] = useState<Movie[]>([]);

    useEffect(() => {
        async function loadFavoriteMovies() {
            const favoriteMovies = await AsyncStorage.getItem("@FavoriteMovies");

            if (favoriteMovies) {
                setFavoriteMovies(JSON.parse(favoriteMovies))
            }
        }
        loadFavoriteMovies();
    }, [])

    const addFavoriteMovies = useCallback(
        async (movieId: number) => {
            if (!favoriteMovies.includes(movieId)) {
                const newFavoriteMovies = [...favoriteMovies, movieId];
                setFavoriteMovies(newFavoriteMovies);
                await AsyncStorage.setItem("@FavoriteMovies", JSON.stringify(newFavoriteMovies));
            }
        },
        [favoriteMovies]
    );

    const removeFavoriteMovies = useCallback(
        async (movieId: number) => {
            const newFavoriteMovies = favoriteMovies.filter(id => id !== movieId);
            setFavoriteMovies(newFavoriteMovies);
            await AsyncStorage.setItem("@FavoriteMovies", JSON.stringify(newFavoriteMovies));
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
    )
}