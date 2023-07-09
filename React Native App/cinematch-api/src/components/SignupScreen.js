import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { auth } from '../../firebase';
import firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';

const white = '#FFFFFF';
const color1 = '#780116';
const color2 = '#C32F27';
const color3 = '#D8572A';
const color4 = '#DB7C26';

export default function SignupScreen({ navigation }) {
  const [contact, setContact] = useState('');
  const [username, setUsername] = useState('');
  const [pass1, setPass1] = useState('');

  const db = firebase.firestore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Home');
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const userId = userCredentials.user.uid;
        const userRef = db.collection('users').doc(userId);
        const userData = {
          movies_liked: {},
          movies_in_watchlist: {},
          comments: {},
          rated_movies: {},
        };
        userRef
          .set(userData)
          .then(() => console.log('User data saved successfully'))
          .catch((error) => console.error('Error saving user data:', error));
      })
      .catch((error) => alert(error.message));
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <LinearGradient
      colors={['#780116', '#C32F27', '#D8572A', '#DB7C26']}
      style={styles.bg}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}>
      <View style={styles.container}>
        <StatusBar hidden={false} translucent={true} />

        <View style={[styles.top, isKeyboardVisible && { opacity: 0.2 }]}>
          <Image
            style={styles.topImage}
            source={require('../images/everett-theatre-cinema-marquee-hollywood-sign.png')}
          />
          <Text style={styles.topText}>CINEMATCH</Text>
        </View>
      </View>

      <Text style={styles.title}>Sign Up</Text>

      {Platform.OS === 'ios' ? (
        <View
          style={
            isKeyboardVisible
              ? { margin: 0, padding: 0 }
              : { marginBottom: 150 }
          }>
          <Text style={styles.formLabel}>Email</Text>
          <TextInput
            style={styles.formInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <Text style={styles.formLabel}>Password</Text>
          <TextInput
            secureTextEntry
            style={styles.formInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.formLabel}>Email</Text>
          <TextInput
            style={styles.formInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <Text style={styles.formLabel}>Password</Text>
          <TextInput
            secureTextEntry
            style={styles.formInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      )}

      <TouchableOpacity
        onPress={() => handleSignUp(email, password)}
        style={styles.formButton}>
        <Text style={styles.formText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.linkBox}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Guest')}
          style={styles.button}
          underlayColor="transparent">
          <Text style={styles.buttonText}>Guest View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
          underlayColor="transparent">
          <Text style={styles.buttonText}>Been here before? Log In</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

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
    width: 325,
    height: 200,
  },
  topText: {
    position: 'absolute',
    top: 70,
    left: 50,
    fontSize: 40,
    color: white,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    color: white,
    marginLeft: 10,
    marginBottom: 10,
  },
  formLabel: {
    marginLeft: 80,
    marginBottom: 10,
    color: white,
    fontSize: 15,
    fontStyle: 'italic',
  },
  formInput: {
    marginLeft: '10%',
    marginBottom: 10,
    width: '80%',
    height: 40,
    backgroundColor: color1,
    opacity: 0.5,
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  formButton: {
    marginLeft: '25%',
    marginTop: 10,
    width: '50%',
    height: 50,
    backgroundColor: color1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formText: {
    color: white,
    fontSize: 25,
    fontStyle: 'italic',
  },
  linkBox: {
    flexDirection: 'row',
    width: '70%',
    marginLeft: '15%',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  button: {
    width: '30%',
    margin: 0,
    padding: 0,
  },
  buttonText: {
    color: white,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
