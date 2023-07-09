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

export default function GenreScreen({ route, navigation }) {
  const { genre } = route.params;
  const [movies, setMovies] = useState([]);

  const [mygenre, setmygenre] = useState();

  const white = '#FFFFFF';
  const color1 = '#780116';
  const color2 = '#C32F27';
  const color3 = '#D8572A';
  const color4 = '#DB7C26';

  useEffect(() => {
    if (genre == 28) {
      setmygenre('Action');
    } else if (genre == 12) {
      setmygenre('Adventure');
    } else if (genre == 16) {
      setmygenre('Animation');
    } else if (genre == 35) {
      setmygenre('Comedy');
    } else if (genre == 80) {
      setmygenre('Crime');
    } else if (genre == 18) {
      setmygenre('Drama');
    } else if (genre == 14) {
      setmygenre('Fantasy');
    } else if (genre == 27) {
      setmygenre('Horror');
    } else if (genre == 10749) {
      setmygenre('Romance');
    } else if (genre == 878) {
      setmygenre('Sci-fi');
    }

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=3faff41c09329d5872ba9f5823910a23&sort_by=popularity.desc&release_date.lte=2018-12-31&with_genres=${genre}&include_adult=false`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, [genre, Math.random().toString()]);

  return (
    <LinearGradient
      colors={[color1, color2, color3, color4]}
      style={styles.bg}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}>
      <View style={styles.container}>
        <StatusBar hidden={false} translucent={true} />
        <NavDrawer currentPage={'genre'} navigation={navigation}></NavDrawer>
        <Popup currentPage={'genre'} navigation={navigation}></Popup>

        <View style={styles.top}>
          <Image
            style={styles.topImage}
            source={require('../images/everett-theatre-cinema-marquee-hollywood-sign.png')}
          />
          <Text style={styles.topText}>CINEMATCH</Text>
        </View>

        <ScrollView style={styles.moviesContainer}>
          <View>
            <View style={styles.movieRow}>
              <Text style={styles.genreTitle}>Top Movies</Text>
            </View>

            <View style={styles.movieContainer}>
              {movies.map((movie, index) => (
                <TouchableOpacity
                  onPress={() => {
                    firebase.auth().onAuthStateChanged((user) => {
                      if (user) {
                        navigation.navigate('MovieDetails', {
                          id: movie.id,
                        });
                      } else {
                        navigation.navigate('MovieDetailsGuest', {
                          id: movie.id,
                        });
                      }
                    });
                  }}
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
