import React, { useRef, useState, useEffect } from 'react';
import {
  TextInput,
  Image,
  ScrollView,
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';


import { LinearGradient } from 'expo-linear-gradient';

import { auth } from '../../firebase';
import firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';

export default function MovieDetails({ route, item, navigation }) {
  const movie = {
    //from backend
    title: "Pan's Labyrinth",
    personalRating: 4,
    imdbRating: 8.5,
    description:
      'In Casablanca, Morocco at December 1941, a cynical American expatriate meets with a former lover, with complications.',
    releaseDate: '1942-11-26',
    genres: ['romance', 'drama'],
    cast: ['Humphrey Bogart', 'Ingrid Bergman'],
    duration: 102,
    country: 'United States of America',
    liked: false,
    onList: false,
  };
  const [open, setOpen] = useState(true);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(movie.liked);
  const [onList, setOnList] = useState(movie.onList);

  const db = firebase.firestore();

  const handleSubmit = (movieId) => {
    const userId = firebase.auth().currentUser.uid;
    const userRef = db.collection('users').doc(userId);

    if (comment === '') {
      console.log('comment is null');
    } else {
      const commentObject = {
        [movieId]: comment,
      };

      userRef
        .update({
          comments: commentObject,
        })
        .then(() => {
          alert('Comment added');
        })
        .catch((error) => {
          console.error('Error adding comment:', error);
        });
    }

    if (rating === '') {
      console.log('rating is null');
    } else {
      if (rating >= 0 && rating <= 5) {
        const ratingObject = {
          [movieId]: rating,
        };

        userRef
          .update({
            rated_movies: ratingObject,
          })
          .then(() => {
            alert('Rating added');
          })
          .catch((error) => {
            console.error('Error adding rating:', error);
          });
      } else {
        console.log('error');
      }
    }
  };

  const handleLikeMovie = (movieId) => {
    const userId = firebase.auth().currentUser.uid;
    const userRef = db.collection('users').doc(userId);

    //alert(userId);
    //alert(movieId);

    if (liked == false) {
      userRef
        .update({
          movies_liked: firebase.firestore.FieldValue.arrayUnion(movieId),
        })
        .then(() => {
          alert('Added to liked movies');
          setLiked(true);
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      userRef
        .update({
          movies_liked: firebase.firestore.FieldValue.arrayRemove(movieId),
        })
        .then(() => {
          alert('Removied from liked movies');
          setLiked(false);
        })
        .catch((error) => {
          console.error(
            "Error removing movie from 'movies_liked' array:",
            error
          );
        });
    }
  };

  const handleOnListMovie = (movieId) => {
    const userId = firebase.auth().currentUser.uid;
    const userRef = db.collection('users').doc(userId);

    if (onList == false) {
      userRef
        .update({
          movies_in_watchlist:
            firebase.firestore.FieldValue.arrayUnion(movieId),
        })
        .then(() => {
          alert('Added to watch list');
          setOnList(true);
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      userRef
        .update({
          movies_in_watchlist:
            firebase.firestore.FieldValue.arrayRemove(movieId),
        })
        .then(() => {
          alert('Removied from watch list');
          setOnList(false);
        })
        .catch((error) => {
          console.error(
            "Error removing movie from 'movies_in_watchlist' array:",
            error
          );
        });
    }
  };

  const hearts = [
    require('../images/empty-heart.png'),
    require('../images/full-heart.png'),
  ];
  const adding = [require('../images/add.png'), require('../images/added.png')];

  const [movieDetails, setMovieDetails] = useState([]);
  const { id } = route.params;

  useEffect(() => {
    
    const checkMovieLiked = (movieId) => {
      const userId = firebase.auth().currentUser.uid;
      const userRef = db.collection('users').doc(userId);

      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            const moviesLiked = data.movies_liked || [];
            if (moviesLiked.includes(movieId)) {
              //alert("Movie exists in movies_liked");
              setLiked(true);
            } else {
              setLiked(false);
            }
          } else {
            alert('User document does not exist');
          }
        })
        .catch((error) => {
          console.error('Error retrieving user document:', error);
        });
    };

    checkMovieLiked(id);

    const checkMovieWatchlist = (movieId) => {
      const userId = firebase.auth().currentUser.uid;
      const userRef = db.collection('users').doc(userId);

      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            const my_movies_in_watchlist = data.movies_in_watchlist || [];
            if (my_movies_in_watchlist.includes(movieId)) {
              //alert("Movie exists in movies_in_watchlist");
              setOnList(true);
            } else {
              setOnList(false);
            }
          } else {
            alert('User document does not exist');
          }
        })
        .catch((error) => {
          console.error('Error retrieving user document:', error);
        });
    };

    checkMovieWatchlist(id);

    const fetchMovieDetails = async (id) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=3faff41c09329d5872ba9f5823910a23&language=en-US`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails(id);

    
  }, [id]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>

        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={styles.closeIcon}
            source={require('../images/close-icon.png')}></Image>
        </TouchableOpacity>


        
        <Image
          style={styles.poster}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
          }}></Image>

        <View style={styles.ratingSection}>
          <Text style={styles.detailLabel}>Your Rating</Text>
          <View style={styles.rateNumbers}>
            <TextInput
              style={
                (styles.detailInfo,
                {
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 5,
                  margin: 5,
                  color: 'white',
                  width: 100
                })
              }
              value={rating}
              onChangeText={setRating}></TextInput>
            <Text style={styles.detailLabel}> /5</Text>
          </View>

          <View style={styles.rateButtons}>
            <TouchableOpacity
              onPress={() => {
                handleLikeMovie(id);
              }}>
              <Image
                style={styles.rateButton}
                source={liked ? hearts[1] : hearts[0]}></Image>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handleOnListMovie(id);
              }}>
              <Image
                style={styles.rateButton}
                source={onList ? adding[1] : adding[0]}></Image>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.details}>
          <Text style={styles.detailTitle}>{movieDetails.title}</Text>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>TMDB Rating:</Text>
            <Text style={styles.detailInfo}>{movieDetails.vote_average}</Text>
          </View>

          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Duration:</Text>
            <Text style={styles.detailInfo}>
              {movieDetails.runtime} minutes
            </Text>
          </View>

          
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Release Date:</Text>
            <Text style={styles.detailInfo}>{movieDetails.release_date}</Text>
          </View>


          <Text style={styles.detailLabel}>Your Comment</Text>
          <View style={styles.rateNumbers}>
            <TextInput
              style={
                (styles.detailInfo,
                {
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 5,
                  margin: 5,
                  color: 'white',
                  width: 200
                })
              }
              value={comment}
              onChangeText={setComment}></TextInput>
            <Text style={styles.detailLabel}></Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleSubmit(id);
            }}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

        
          
        </View>
        
    </View>
  );
}

const white = '#FFFFFF';
const color1 = '#780116';
const color2 = '#C32F27';
const color3 = '#D8572A';
const color4 = '#DB7C26';

const styles = StyleSheet.create({
  poster: {
    height: '30%',
    width: '80%',
    borderRadius: 10,
    borderColor: white,
    borderWidth: 2,
    marginTop: 50,
    marginLeft: '10%',
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 5,
    zIndex: 999,
    height: 20,
    width: 20,
  },
  ratingSection: {},
  details: {
    textAlign: 'left',

  },
  detailTitle: {
    color: 'grey',
    textDecorationLine: 'underline',
    fontSize: 20,
    margin: 5,
  },
  detail: {
    flexDirection: 'row',
    width: '90%',
  },
  detailLabel: {
    color: 'grey',
    fontSize: 15,
    margin: 5,
  },
  detailInfo: {
    color: white,
    fontSize: 15,
    margin: 5,
  },
  ratingSection: {
    flexDirection: 'column',
  },
  rateNumbers: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rateButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    width: 80,
  },
  rateButton: {
    width: 25,
    height: 25,
    margin: 5,
  },
  divider: {
    width: 1,
    height: 18,
    backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  
});
