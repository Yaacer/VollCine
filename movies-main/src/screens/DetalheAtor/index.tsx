import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { CaretLeft } from 'phosphor-react-native';

type ActorDetails = {
  id: number;
  name: string;
  biography: string;
  profile_path: string;
  birthday: string;
  place_of_birth: string;
  movie_credits: {
    cast: {
      id: number;
      title: string;
      poster_path: string;
      release_date: string;
    }[];
  };
};

type RouterProps = {
  actorId: number;
};

export function ActorDetails() {
  const [actorDetails, setActorDetails] = useState<ActorDetails | null>(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { actorId } = route.params as RouterProps;

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const response = await api.get(`/person/${actorId}`, {
          params: { append_to_response: 'movie_credits' }
        });
        setActorDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchActorDetails();
  }, [actorId]);

  const renderMovies = () => (
    actorDetails?.movie_credits.cast.map(movie => (
      <TouchableOpacity key={movie.id} onPress={() => navigation.navigate('Details', { movieId: movie.id })}>
        <View style={styles.movieContainer}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
            style={styles.movieImage}
          />
          <Text style={styles.movieTitle}>{movie.title}</Text>
        </View>
      </TouchableOpacity>
    ))
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CaretLeft color="#fff" size={32} weight="thin" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalhes do Ator</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.actorDetailsContainer}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${actorDetails?.profile_path}` }}
            style={styles.actorImage}
          />
          <Text style={styles.actorName}>{actorDetails?.name}</Text>
          <Text style={styles.actorBio}>{actorDetails?.biography}</Text>
          <Text style={styles.actorInfo}>Data de nascimento: {actorDetails?.birthday}</Text>
          <Text style={styles.actorInfo}>Local de nascimento: {actorDetails?.place_of_birth}</Text>
        </View>
        <View style={styles.moviesContainer}>
          <Text style={styles.moviesTitle}>Filmes</Text>
          {renderMovies()}
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
  actorDetailsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  actorImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  actorName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
  },
  actorBio: {
    color: '#fff',
    textAlign: 'justify',
    marginTop: 10,
  },
  actorInfo: {
    color: '#92929D',
    marginTop: 5,
  },
  moviesContainer: {
    padding: 20,
  },
  moviesTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  movieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  movieImage: {
    width: 50,
    height: 75,
    borderRadius: 8,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },
});