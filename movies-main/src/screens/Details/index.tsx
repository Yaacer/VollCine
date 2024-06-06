import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { api } from "../../services/api";
import {
  BookmarkSimple,
  CalendarBlank,
  CaretLeft,
  Clock,
  Star,
} from "phosphor-react-native";

// Tipagem MovieDetails
type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  runtime: string;
  release_date: string;
  vote_average: number;
};

type SimilarMovie = {
  id: number;
  title: string;
  poster_path: string;
};

type RouterProps = {
  movieId: number;
};

export function Details() {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { movieId } = route.params as RouterProps;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/movie/${movieId}`);
        setMovieDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    const fetchSimilarMovies = async () => {
      try {
        const response = await api.get(`/movie/${movieId}/similar`);
        setSimilarMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieDetails();
    fetchSimilarMovies();
  }, [movieId]);

  function getYear(data: string) {
    const ano = new Date(data).getFullYear();
    return ano;
  }

  const renderSimilarMovie = (movie: SimilarMovie) => (
    <View key={movie.id} style={styles.similarMovie}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
        style={styles.similarMovieImage}
      />
      <Text style={styles.similarMovieTitle}>{movie.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <CaretLeft color="#fff" size={32} weight="thin" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalhes</Text>
        <TouchableOpacity>
          <BookmarkSimple color="#fff" size={32} weight="thin" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`,
            }}
            style={styles.detailsImage}
          />
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
            }}
            style={styles.detailsPosterImage}
          />
          <Text style={styles.titleMovie}>{movieDetails?.title}</Text>
          <View style={styles.description}>
            <View style={styles.descriptionGroup}>
              <CalendarBlank color="#92929D" size={25} weight="thin" />
              <Text style={styles.descriptionText}>
                {getYear(movieDetails?.release_date)}
              </Text>
            </View>
            <View style={styles.descriptionGroup}>
              <Clock color="#92929D" size={25} weight="thin" />
              <Text
                style={styles.descriptionText}
              >{`${movieDetails?.runtime} minutos`}</Text>
            </View>
            <View style={styles.descriptionGroup}>
              <Star
                color={
                  movieDetails?.vote_average.toFixed(2) >= "7" ? "#FF8700" : "#92929D"
                }
                size={25}
                weight={
                  movieDetails?.vote_average.toFixed(2) >= "7" ? "duotone": "thin"
                }
              />
              <Text
                style={[
                  movieDetails?.vote_average.toFixed(2) >= "7"
                    ? styles.descriptionText1
                    : styles.descriptionText,
                ]}
              >
                {movieDetails?.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.about}>
          <Text style={styles.aboutTextTitle}>Sinopse</Text>
          <Text style={styles.aboutText}>
            {movieDetails?.overview === ""
              ? "Ops! Parece que esse filme ainda não tem sinopse :-("
              : movieDetails?.overview}
          </Text>
        </View>
        <View style={styles.similarMoviesContainer}>
          <Text style={styles.similarMoviesTitle}>Filmes que você pode gostar</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {similarMovies.map(renderSimilarMovie)}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  header: {
    paddingTop: 30,
    height: 115,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  detailsImage: {
    width: "100%",
    height: 210,
  },
  detailsPosterImage: {
    width: 100,
    height: 160,
    borderRadius: 16,
    position: "absolute",
    left: 29,
    top: 140,
  },
  titleMovie: {
    position: "absolute",
    left: 140,
    top: 240,
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  description: {
    marginTop: 170,
    flexDirection: "row",
    justifyContent: "center",
  },
  descriptionGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  descriptionText: {
    color: "#92929D",
    marginLeft: 4,
  },
  descriptionText1: {
    color: "#FF8700",
    marginLeft: 4,
  },
  about: {
    padding: 20,
  },
  aboutTextTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  aboutText: {
    color: "#fff",
    textAlign: "justify",
  },
  similarMoviesContainer: {
    marginTop: 20,
  },
  similarMoviesTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  similarMovie: {
    marginRight: 10,
  },
  similarMovieImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  similarMovieTitle: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
});