import React, { useRef, useState } from 'react';
import { Image, ScrollView, Animated, StyleSheet, Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import SettingsMenu from './SettingsMenu';

import { auth } from '../../firebase';

export default function Popup({currentPage, navigation}){
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu(){
    setIsOpen(!isOpen)
  }
  function openSettingsPopup(){
    navigation.navigate('Settings', {page: currentPage, navigation:navigation});
  }

  const signout = async () => {
    try {
      await auth.signOut();
      // You can perform additional actions after sign-out if needed
      console.log('User signed out successfully');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>

      <View style={isOpen? styles.popupBox: styles.closed}>
        <TouchableOpacity style={styles.popupRow} onPress={()=>{if(currentPage==='guest'){navigation.navigate('Login')}else openSettingsPopup()}}>
            <Text style={styles.popupText}>{currentPage==='guest' ? "Login" : "Settings"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.popupRow} onPress={()=>{if(currentPage==='guest'){navigation.navigate('Signup')}else signout()}}>
            <Text style={styles.popupText}>{currentPage==='guest' ? "Sign Up" : "Sign Out"}</Text>
        </TouchableOpacity>
      </View>

      <TouchableWithoutFeedback onPress={toggleMenu}>
        {/* <a href="https://www.flaticon.com/free-icons/more" title="more icons">More icons created by Kirill Kazachek - Flaticon</a> */}
        <Image style={styles.iconImage} source={require('../images/dot-icon.png')}></Image>
      </TouchableWithoutFeedback>

    </View>
  );
};

const white = '#FFFFFF';
const color1="#780116";
const color2="#C32F27";
const color3="#D8572A";
const color4="#DB7C26";

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 999,
    flexDirection: 'row'
  },
  iconImage:{
    width: 40,
    height: 40
  },
  closed:{
    display:'none'
  },
  popupBox:{
    backgroundColor: 'black',
    padding:10,
    borderRadius: 10,
    marginRight: 10
  },
  popupText:{
    color: white,
    fontSize: 15,
    padding: 10
  }
});
