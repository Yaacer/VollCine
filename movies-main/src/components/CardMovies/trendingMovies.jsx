import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MovieCard = ({ movie }) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
      />
      <Text style={styles.title}>{movie.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginHorizontal: 10,
    marginTop: 10 // Ajusta a margem horizontal para espaçamento entre os cartões
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    marginTop: 5,
    color: '#fff', // Título branco
    fontSize: 14,
    textAlign: 'center',
  },
});

export default MovieCard;