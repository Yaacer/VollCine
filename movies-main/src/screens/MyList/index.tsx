import React, { useContext, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MovieContext } from "../../contexts/MoviesContext"; // Corrija o caminho conforme necessário
import { useNavigation } from "@react-navigation/native";

export function MyList() {
  const { allFavoriteMovies, removeFavoriteMovies } = useContext(MovieContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Filmes Favoritos</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {allFavoriteMovies.map((movie) => (
          <View key={movie.id} style={styles.movieContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Details', { movieId: movie.id })}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
                style={styles.movieImage}
              />
            </TouchableOpacity>
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <TouchableOpacity onPress={() => removeFavoriteMovies(movie.id)}>
                <Text style={styles.removeButton}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  movieContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  movieInfo: {
    marginLeft: 10,
    flex: 1,
  },
  movieTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  removeButton: {
    color: "#FF8700",
    marginTop: 10,
  },
});
