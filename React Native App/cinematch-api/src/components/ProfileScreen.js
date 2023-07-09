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
  Alert,
} from 'react-native';
import NavDrawer from './NavDrawer';
import { LinearGradient } from 'expo-linear-gradient';
import Popup from './Popup';

import { auth } from '../../firebase';
import firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';

export default function ProfileScreen({ navigation, userName }) {
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);

  const [fLikedMovies, setfLikedMovies] = useState([]);
  const [fWatchlistMovies, setfWatchlistMovies] = useState([]);


  const refreshMovies = async () => {
    fetchWatchlistMovies();
    fetchLikedMovies();
  };
  
  useEffect(() => {
    const user = firebase.auth().currentUser;
    const userId = user.uid;

    const fetchWatchlistMovies = async () => {
      try {
        const docRef = firebase.firestore().collection('users').doc(userId);
        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
          const userData = docSnapshot.data();
          const wlMoviesData = userData.movies_in_watchlist;
          //alert(wlMoviesData);

          wlMoviesData.forEach((element) => {
            fetchMovieDetails1(element);
          });

          setWatchlistMovies(wlMoviesData);
        } else {
          alert('User document does not exist');
        }
      } catch (e) {
        alert(e);
      }
    };

    const fetchLikedMovies = async () => {
      try {
        const docRef = firebase.firestore().collection('users').doc(userId);
        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
          const userData = docSnapshot.data();
          const likedmoviesdata = userData.movies_liked;
          //alert(wlMoviesData);

          likedmoviesdata.forEach((element) => {
            fetchMovieDetails2(element);
          });

          setLikedMovies(likedmoviesdata);
        } else {
          alert('User document does not exist');
        }
      } catch (e) {
        alert(e);
      }
    };

    const fetchMovieDetails1 = async (movieId) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=3faff41c09329d5872ba9f5823910a23`
        );
        const data = await response.json();
        //alert(data.title);
        //return data;
        setfWatchlistMovies((prevMovies) => [...prevMovies, data]);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
      }
    };

    const fetchMovieDetails2 = async (movieId) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=3faff41c09329d5872ba9f5823910a23`
        );
        const data = await response.json();
        //alert(data.title);
        //return data;
        setfLikedMovies((prevMovies) => [...prevMovies, data]);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
      }
    };


    fetchWatchlistMovies();
    fetchLikedMovies();
  }, []);

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
 
            

            <View>
              <Text style={styles.genreTitle}>Liked Movies:</Text>

              <View style={styles.movieContainer}>
                {fLikedMovies.map((movie) => (
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


              <Text style={styles.genreTitle}>Watchlist Movies:</Text>

              <View style={styles.movieContainer}>
                {fWatchlistMovies.map((movie) => (
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

  movieRow: {
    width: '100%',
    marginLeft: 10,
  },
  genreTitle: {
    fontSize: 20,
    color: white,
    fontStyle: 'italic',
  },

  button: {
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },

  poster: {
    width: '100%',
    height: 150,
    borderRadius: 10,
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
