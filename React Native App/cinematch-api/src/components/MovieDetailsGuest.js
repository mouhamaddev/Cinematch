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
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

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


  const hearts = [
    require('../images/empty-heart.png'),
    require('../images/full-heart.png'),
  ];
  const adding = [require('../images/add.png'), require('../images/added.png')];

  const [movieDetails, setMovieDetails] = useState([]);
  const { id } = route.params;

  useEffect(() => {

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

        <View style={styles.details}>
          <Text style={styles.detailTitle}>{movieDetails.title}</Text>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>TMDB Rating:</Text>
            <Text style={styles.detailInfo}>{movieDetails.vote_average}</Text>
          </View>

          <Text style={styles.detailInfo}>{movieDetails.overview}</Text>

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
