import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';
import { api } from '../../services/api';
import { Logo } from '../../components/Logo';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.7;
const SPACING = 10;

const MainHome = ({ navigation }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const scrollX = new Animated.Value(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trendingResponse = await api.get('/trending/movie/week');
        setTrendingMovies(trendingResponse.data.results);

        const upcomingResponse = await api.get('/movie/upcoming');
        setUpcomingMovies(upcomingResponse.data.results);

        const topRatedResponse = await api.get('/movie/top_rated');
        setTopRatedMovies(topRatedResponse.data.results);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    fetchMovies();
  }, []);

  const renderSection = (title, data, showSeeAll) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {showSeeAll && <TouchableOpacity onPress={() => navigation.navigate('Search')}><Text style={styles.seeAll}>Veja Tudo</Text></TouchableOpacity>}
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Details", { movieId: item.id })}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.movieImage}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Logo style={styles}/>
      <View style={styles.highlightSection}>
        <Text style={styles.highlightTitle}>Tendência</Text>
        <Animated.FlatList
          data={trendingMovies.concat(topRatedMovies).slice(0, 10)}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * ITEM_WIDTH,
              index * ITEM_WIDTH,
              (index + 1) * ITEM_WIDTH,
            ];
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.8, 1, 0.8],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
              extrapolate: 'clamp',
            });
            const showTitle = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
              extrapolate: 'clamp',
            });
            return (
              <TouchableOpacity onPress={() => navigation.navigate("Details", { movieId: item.id })}>
                <Animated.View style={[styles.highlightImageContainer, { opacity, transform: [{ scale }] }]}>
                  <Image 
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} 
                    style={styles.highlightImage} 
                  />
                  <Animated.Text style={[styles.movieTitle, { opacity: showTitle }]}>{item.title}</Animated.Text>
                </Animated.View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{ paddingHorizontal: (width - ITEM_WIDTH) / 2 }}
        />
      </View>
      {renderSection('Em Breve', upcomingMovies, true)}
      {renderSection('Em Alta', topRatedMovies, true)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  highlightSection: {
    marginVertical: 50,
    height: 500,
  },
  highlightTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  highlightImageContainer: {
    width: ITEM_WIDTH,
    marginHorizontal: SPACING,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightImage: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
  movieTitle: {
    marginTop: 10,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  seeAll: {
    fontSize: 14,
    color: '#C3130F',
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default MainHome;
