import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie }) => {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: IMAGE_BASE_URL + movie.poster_path }} 
        style={styles.image}
      />
      <Text style={styles.title}>{movie.title}</Text>
      {/* Adicione outros detalhes do filme aqui se necessário */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    elevation: 5,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    padding: 10,
  },
});

export default MovieCard;