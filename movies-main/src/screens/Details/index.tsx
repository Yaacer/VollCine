import React, { useEffect, useState, useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal, Platform } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { BookmarkSimple, CalendarBlank, CaretLeft, Clock, Star } from "phosphor-react-native";
import { WebView } from 'react-native-webview';
import { api } from "../../services/api";
import { MovieContext } from '../../contexts/MoviesContext';

// Tipagem MovieDetails
type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  runtime: number;
  release_date: string;
  vote_average: number;
  credits: {
    cast: {
      id: number;
      name: string;
      profile_path: string;
      character: string;
    }[];
  };
  genres: Genre[]; 
};

type SimilarMovie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};

type Trailer = {
  key: string;
  type: string;
};

type RouterProps = {
  movieId: number;
};

type Genre = {
  id: number;
  name: string;
};

export function Details({ navigation }) {
  const { addFavoriteMovies, removeFavoriteMovies, favoriteMovies } = useContext(MovieContext);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const route = useRoute();
  const { movieId } = route.params as RouterProps;

  const isFavorite = favoriteMovies.includes(movieId);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/movie/${movieId}`, {
          params: { append_to_response: 'credits' }
        });
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
        // Ordena os filmes similares por data de lançamento de forma decrescente
        const sortedSimilarMovies = response.data.results.sort((a, b) => Date.parse(b.release_date) - Date.parse(a.release_date));
        setSimilarMovies(sortedSimilarMovies);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieDetails();
    fetchSimilarMovies();
  }, [movieId]);

  const fetchTrailer = async (id: number) => {
    try {
      const response = await api.get(`/movie/${id}/videos`);
      const trailer = response.data.results.find((video: Trailer) => video.type === 'Trailer');
      setTrailerKey(trailer ? trailer.key : null);
      setModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/movie/${movieId}`, {
        params: { append_to_response: 'credits,genres' } // Adicionando 'genres' aos parâmetros
      });
      setMovieDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  function getYear(data: string) {
    const year = new Date(data).getFullYear();
    return year;
  }

  const renderSimilarMovie = (movie: SimilarMovie) => (
    <TouchableOpacity key={movie.id} onPress={() => navigation.navigate('Details', { movieId: movie.id })}>
      <View style={styles.similarMovie}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
          style={styles.similarMovieImage}
        />
        <Text style={styles.similarMovieTitle} numberOfLines={1}>{movie.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavoriteMovies(movieId);
    } else {
      addFavoriteMovies(movieId);
    }
  };

  const renderCast = () => (
    movieDetails?.credits.cast.slice(0, 4).map(actor => (
      <TouchableOpacity key={actor.id} onPress={() => navigation.navigate('ActorDetails', { actorId: actor.id })}>
        <View style={styles.actorContainer}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w200${actor.profile_path}` }}
            style={styles.actorImage}
          />
          <View style={styles.actorTextContainer}>
            <Text style={styles.actorName}>{actor.name}</Text>
            <Text style={styles.actorCharacter}>{actor.character}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ))
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <CaretLeft color="#fff" size={32} weight="thin" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalhes</Text>
        <TouchableOpacity onPress={handleFavoriteToggle}>
          <BookmarkSimple color={isFavorite ? "#FF8700" : "#fff"} size={32} weight="thin" />
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
          <TouchableOpacity onPress={() => fetchTrailer(movieDetails?.id)}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
              }}
              style={styles.detailsPosterImage}
            />
          </TouchableOpacity>
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
              <Text style={styles.descriptionText}>{`${movieDetails?.runtime} minutos`}</Text>
            </View>
            <View style={styles.descriptionGroup}>
              <Star
                color={movieDetails?.vote_average >= 7 ? "#FF8700" : "#92929D"}
                size={25}
                weight={movieDetails?.vote_average >= 7 ? "duotone" : "thin"}
              />
              <Text
                style={movieDetails?.vote_average >= 7 ? styles.descriptionText1 : styles.descriptionText}
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
          <Text style={styles.aboutTextTitle}>Gêneros</Text>
          <View style={styles.genresContainer}>
            {movieDetails?.genres.map(genre => (
              <Text key={genre.id} style={styles.genre}>{genre.name}</Text>
            ))}
          </View>
        </View>
        <View style={styles.castContainer}>
          <Text style={styles.castTitle}>Elenco Principal</Text>
          {renderCast()}
        </View>
        <View style={styles.similarMoviesContainer}>
          <Text style={styles.similarMoviesTitle}>Filmes que você pode gostar</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.similarMoviesScroll}>
            {similarMovies.map(renderSimilarMovie)}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Modal para exibir o trailer */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
          {trailerKey ? (
            Platform.OS === 'web' ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={styles.webView}
              />
            ) : (
              <WebView
                source={{ uri: `https://www.youtube.com/embed/${trailerKey}` }}
                style={styles.webView}
              />
            )
          ) : (
            <Text style={styles.noTrailerText}>Trailer não disponível</Text>
          )}
        </View>
      </Modal>
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
    top: 20,
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
    marginTop: 190,
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
    marginTop: 10,
  },
  aboutText: {
    color: "#fff",
    textAlign: "justify",
  },
  castContainer: {
    padding: 20,
  },
  castTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  actorContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  actorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  actorTextContainer: {
    marginLeft: 10,
  },
  actorName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  actorCharacter: {
    color: '#92929D',
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
  similarMoviesScroll: {
    paddingLeft: 10,
  },
  similarMovie: {
    marginRight: 10,
    alignItems: 'center',
    width: 100,
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
    width: '100%', // Ensure the text stays within the bounds of the container
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  webView: {
    width: '100%',
    height: '80%',
  },
  noTrailerText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  genre: {
    color: '#fff',
    backgroundColor: '#C3130F',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
});
