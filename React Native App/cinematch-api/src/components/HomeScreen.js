import { React, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import NavDrawer from './NavDrawer';
import { LinearGradient } from 'expo-linear-gradient';
import Popup from './Popup';

import { auth } from '../../firebase';
import firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';


const API_KEY = '3faff41c09329d5872ba9f5823910a23';

export default function HomeScreen({ navigation }) {

  const [movies, setMovies] = useState([]);
  const [mygenre, setMyGenre] = useState();

  const [searchResults, setSearchResults] = useState([]);

const [topMovies, setTopMovies] = useState([]);

  const [recommend, setRecommend] = useState();
  const [displayRecommended, setdisplayRecommended] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const [movieDetails, setMovieDetails] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/discover/movie?api_key=3faff41c09329d5872ba9f5823910a23&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&primary_release_year=2017&vote_count.gte=1000'
        );
        const data = await response.json();
        setTopMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopMovies();
  }, []);

  function getMovieDetails(itemid) {
    navigation.navigate('MovieDetails', {
      itemID: itemid,
      originPage: 'home',
      navigation: navigation,
    });
  }


  const refreshMovies = async () => {
    setLoading(true);
    setdisplayRecommended(false);
    fetchMovies();
  };

  const searchMovies = async () => {
    try {
      const encodedQuery = encodeURIComponent(searchQuery);
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodedQuery}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }

      const responseData = await response.json();
      if (responseData.results && responseData.results.length > 0) {
        setSearchResults(responseData.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
      setSearchResults([]);
    }
  };

  const fetchMovies = async () => {
    const user = firebase.auth().currentUser;
    if (!user) {
      return; // No signed-in user, exit early
    }

    const uid = user.uid;
    try {
      const response = await fetch(`http://16.16.192.111:8000/api/${uid}/`);
      const responseData = await response.text();
      console.log(responseData);
      const data = JSON.parse(responseData);
      const movieNames = data.list_data.map((movie) => movie.slice(0, -7));
      setMovies(movieNames);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchMovies();
    searchMovies();
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const moviePromises = movies.map(async (movie) => {
        try {
          const encodedMovieName = encodeURIComponent(movie);
          const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodedMovieName}`;

          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error('Failed to fetch movie details');
          }

          const responseData = await response.json();
          if (responseData.results && responseData.results.length > 0) {
            return responseData.results[0];
          } else {
            throw new Error('No movie details found');
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      });

      const movieDetails = await Promise.all(moviePromises);
      setMovieDetails(movieDetails.filter((movie) => movie !== null));
    };

    if (movies.length < 1) {
      setLoading(false);
      setdisplayRecommended(false);
    } else {
      setLoading(false);
      setdisplayRecommended(true);
      fetchMovieDetails();
    }
  }, [movies]);

  return (
    <LinearGradient
      colors={[color1, color2, color3, color4]}
      style={styles.bg}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}>
      <View style={styles.container}>
        <StatusBar hidden={false} translucent={true} />
        <NavDrawer currentPage={'home'} navigation={navigation}></NavDrawer>
        <Popup currentPage={'home'} navigation={navigation}></Popup>

        <View style={styles.top}>
          <Image
            style={styles.topImage}
            source={require('../images/everett-theatre-cinema-marquee-hollywood-sign.png')}
          />
          <Text style={styles.topText}>CINEMATCH</Text>
        </View>

        <View style={styles.searchbar}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchIcon} onPress={searchMovies}>
            <Image
              style={styles.searchIcon}
              source={require('../images/search-icon.png')}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.moviesContainer}>
          <View>
            {searchResults.length > 0 ? (
              <View>
                <View style={styles.movieRow}>
                  <Text style={styles.genreTitle}>Search Results</Text>
                </View>

                <View style={styles.movieContainer}>
                  {searchResults.map((movie, index) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('MovieDetails', {
                          id: movie.id,
                        })
                      }
                      key={movie.id}
                      style={styles.movieItem}>
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                        }}
                        style={styles.poster}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : (
              <View>
                {loading ? (
                  <View>
                    <Text style={styles.genreTitle}>Loading...</Text>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => fetchMovies()}>
                      <Text style={styles.buttonText}>Refresh</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    {displayRecommended ? (
                      <View>
                        <View style={styles.movieRow}>
                          <Text style={styles.genreTitle}>
                            Recommended Movies
                          </Text>
                          <View>
                            <TouchableOpacity
                              style={styles.button}
                              onPress={() => refreshMovies()}>
                              <Text style={styles.buttonText}>Refresh</Text>
                            </TouchableOpacity>
                          </View>
                        </View>

                        <View style={styles.movieContainer}>
                          {movieDetails.map((movie, index) => (
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate('MovieDetails', {
                                  id: movie.id,
                                })
                              }
                              key={movie.id}
                              style={styles.movieItem}>
                              <Image
                                source={{
                                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                                }}
                                style={styles.poster}
                              />
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    ) : (

<View>
{error ? (<View>             
                <View style={styles.movieRow}>
                  <Text style={styles.genreTitle}>Top Movies</Text>
                  <TouchableOpacity
                              style={styles.button}
                              onPress={() => refreshMovies()}>
                              <Text style={styles.buttonText}>Refresh</Text>
                            </TouchableOpacity>
                </View>

                <View style={styles.movieContainer}>
                  {topMovies.map((movie, index) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('MovieDetails', {
                          id: movie.id,
                        })
                      }
                      key={movie.id}
                      style={styles.movieItem}>
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                        }}
                        style={styles.poster}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>):(<View>
                        <Text style={styles.genreTitle}>Loading...</Text>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => fetchMovies()}>
                          <Text style={styles.buttonText}>Refresh</Text>
                        </TouchableOpacity>
                      </View>)}

</View>
                      
                    )}
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
const white = '#FFFFFF';
const color1 = '#780116';
const color2 = '#C32F27';
const color3 = '#D8572A';
const color4 = '#DB7C26';

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    // position: 'relative'
  },
  topImage: {
    width: 200,
    height: 130,
  },
  topText: {
    position: 'absolute',
    top: 50,
    left: 30,
    fontSize: 25,
    color: white,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color1,
    borderRadius: 30,
    width: '90%',
    height: 40,
    margin: 5,
    padding: 5,
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
  searchInput: {
    width: '90%',
    height: '100%',
    color: white,
    paddingLeft: 10,
    zIndex: 1001,
  },
  moviesContainer: {
    height: 300,
  },
  movieRow: {
    width: '100%',
    marginLeft: 10,
  },
  genreTitle: {
    fontSize: 20,
    color: white,
    fontStyle: 'italic',
  },
  posterBox: {
    width: 300,
  },
  poster: {
    /*
    width: 100,
    height: 150,
    margin: 20,
    borderRadius: 10,*/
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  posterImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },

  movieContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  movieItem: {
    width: '30%',
    marginBottom: 10,
  },
});
