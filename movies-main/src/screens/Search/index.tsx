import { MagnifyingGlass } from "phosphor-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";

import { CardMovies } from "../../components/CardMovies";

import { api } from "../../services/api";

import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Logo } from "../../components/Logo";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export function Search() {
  const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
  const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMoreData();
  }, []);

  const loadMoreData = async () => {
    setLoading(true);
    const response = await api.get("/discover/movie", {
      params: {
        page,
        'primary_release_date.gte': '2020-01-01',
        'sort_by': 'popularity.desc',
        'vote_average.gte': 7,
      },
    });
    setDiscoveryMovies([...discoveryMovies, ...response.data.results]);
    setPage(page + 1);
    setLoading(false);
  };

  const searchMovies = async (query: string) => {
    setLoading(true);
    const response = await api.get("/search/movie", {
      params: {
        query,
        'primary_release_date.gte': '2020-01-01', 
        'sort_by': 'popularity.desc', 
        'vote_average.gte': 7, 
      },
    });

    if (response.data.results.length === 0) {
      setNoResult(true);
      setLoading(false);
      setSearchResultMovies([]);
    } else {
      setNoResult(false);
      setSearchResultMovies(response.data.results);
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 2) {
      searchMovies(text);
    } else {
      setSearchResultMovies([]);
    }
  };

  const navigation = useNavigation();

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <CardMovies
      data={item}
      onPress={() => navigation.navigate("Details", { movieId: item.id })}
    />
  );

  const movieData = search.length > 2 ? searchResultMovies : discoveryMovies;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo style={styles}/>
        <Text style={styles.headerText}>O que você quer assistir hoje?</Text>

        <View style={styles.containerInput}>
          <TextInput
            placeholderTextColor="#FFF"
            placeholder="Buscar"
            style={styles.input}
            value={search}
            onChangeText={handleSearch}
          />
          <MagnifyingGlass color="#FFF" size={25} weight="light" />
        </View>

        {noResult && (
          <Text style={styles.noResult}>
            Nenhum filme encontrado para "{search}"
          </Text>
        )}
      </View>
      <View style={styles.flatList}>
        <FlatList
          data={movieData}
          numColumns={3}
          renderItem={renderMovieItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            padding: 35,
            paddingBottom: 100,
          }}
          onEndReached={() => loadMoreData()}
          onEndReachedThreshold={0.5}
        />
        {loading && <ActivityIndicator size={50} color="#0296e5" />}
      </View>
    </View>
  );
}