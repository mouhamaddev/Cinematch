import React, { useRef, useState } from 'react';
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

import { auth } from '../../firebase';
import firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';

export default function SettingsMenu({ page, navigation }) {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function exitSettings() {
    //navigate to previous page
    if (page === 'profile') {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('Home');
    }
  }


  async function handleSubmitChanges() {
  if (newPassword !== confirmPassword) {
    // Show an error message or handle the password mismatch case as desired
    alert("Passwords don't match");
    return;
  }

  try {
    const user = auth.currentUser;

    if (newEmail !== '') {
      await user.updateEmail(newEmail);
      alert('Email updated successfully');
    }

    if (newPassword !== '') {
      await user.updatePassword(newPassword);
      alert('Password updated successfully');
    }

    // Handle success or navigate to a success screen
  } catch (error) {
    alert(error);
  }
}


  return (
    <LinearGradient
      colors={[color1, color2, color3, color4]}
      style={styles.bg}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}>
      <View style={true ? styles.container : styles.hidden}>
        {/* <a href="https://www.flaticon.com/free-icons/close" title="close icons">Close icons created by ariefstudio - Flaticon</a> */}
        <TouchableOpacity style={styles.closeIcon} onPress={exitSettings}>
          <Image
            style={styles.closeIcon}
            source={require('../images/close-icon.png')}></Image>
        </TouchableOpacity>

        <View>
          <Image
            style={styles.topImage}
            source={require('../images/everett-theatre-cinema-marquee-hollywood-sign.png')}
          />
          <Text style={styles.topText}>CINEMATCH</Text>
        </View>

        <Text style={styles.settingsText}>Edit Email</Text>
        <TextInput
          style={styles.settingsInput}
          placeholderTextColor={white}
          placeholder="New Email"
          value={newEmail}
          onChangeText={setNewEmail}
        />

        <Text style={styles.settingsText}>Edit Password</Text>
        <TextInput
          style={styles.settingsInput}
          placeholderTextColor={white}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />

        <Text style={styles.settingsText}>Confirm Password</Text>
        <TextInput
          style={styles.settingsInput}
          placeholderTextColor={white}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.settingsButton} onPress={handleSubmitChanges}>
  <Text style={styles.buttonText}>Submit Changes</Text>
</TouchableOpacity>

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
  hidden: {
    display: 'none',
  },
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 999,
    height: 30,
    width: 30,
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
  settingsInput: {
    backgroundColor: color1,
    opacity: 0.4,
    padding: 5,
    width: '70%',
    borderRadius: 30,
  },
  settingsTitle: {
    color: white,
    fontSize: 40,
    margin: 20,
  },
  settingsSubtitle: {
    color: white,
    fontSize: 30,
  },
  settingsText: {
    color: white,
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  settingsButton: {
    backgroundColor: color1,
    padding: 5,
    width: '40%',
    borderRadius: 30,
    alignItems: 'center',
    margin: 30,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: white,
  },
});
