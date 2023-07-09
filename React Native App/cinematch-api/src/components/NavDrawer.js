import React, { useState } from 'react';
import { Image, ScrollView, Animated, StyleSheet, Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';

export default function NavDrawer({currentPage, navigation}){
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  function chooseGenre(genre){
    navigation.navigate('Genre', { genre });
  }

  return (
    <View style={isOpen? styles.container: styles.closed}>
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <View style={styles.button}>
            {/* <a href="https://www.flaticon.com/free-icons/hamburger" title="hamburger icons">Hamburger icons created by feen - Flaticon</a> */}
            <Image style={styles.iconImage} source={require('../images/menu-icon.png')}></Image> 
        </View>
      </TouchableWithoutFeedback>

      <Animated.View style={isOpen?styles.menu:{display:'none', left: -400, zIndex: 0}}>
        <TouchableOpacity style={currentPage==="home"? styles.navRow: styles.selectedRow} onPress={() => {if(currentPage!=="guest") navigation.navigate('Profile')}}>
            {/* <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Phoenix Group - Flaticon</a> */}
            <Image style={styles.navIcon} source={require('../images/profile-icon.png')}></Image> 
            <Text style={styles.navTitle}>{currentPage!=="guest"? "Profile": "Guest"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={currentPage==="home"? styles.selectedRow: styles.navRow} onPress={()=>{if(currentPage!=="guest") navigation.navigate('Home'); else navigation.navigate('Guest')}}>
            {/* <a href="https://www.flaticon.com/free-icons/home-button" title="home button icons">Home button icons created by Freepik - Flaticon</a> */}
            <Image style={styles.navIcon} source={require('../images/home-icon.png')}></Image> 
            <Text style={styles.navTitle}>Home</Text>
        </TouchableOpacity>

        <ScrollView style={styles.genreBox}>
           <TouchableOpacity onPress={() => chooseGenre('28')}>
                <Text style={styles.genreText}>Action</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => chooseGenre('12')}>
                <Text style={styles.genreText}>Adventure</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => chooseGenre('16')}>
                <Text style={styles.genreText}>Animation</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => chooseGenre('35')}>
                <Text style={styles.genreText}>Comedy</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => chooseGenre('80')}>
                <Text style={styles.genreText}>Crime</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => chooseGenre('18')}>
                <Text style={styles.genreText}>Drama</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => chooseGenre('14')}>
                <Text style={styles.genreText}>Fantasy</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => chooseGenre('27')}>
                <Text style={styles.genreText}>Horror</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => chooseGenre('10749')}>
                <Text style={styles.genreText}>Romance</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => chooseGenre('878')}>
                <Text style={styles.genreText}>Sci-fi</Text>
           </TouchableOpacity>
        </ScrollView>
      </Animated.View>
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
    top: 0,
    left: 0,
    zIndex: 999,
    height: '100%',
    width: '45%',
  },
  closed: {
    position: 'absolute',
    top: 0,
    left: 0,
  
    height: '100%',
    width: '45%',
  },
  iconImage:{
    width: 40,
    height: 40
  },
  navRow:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10
  },
  selectedRow:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: color1,
    padding: 10
  },
  navIcon:{
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 20
  },
  navTitle:{
    color: white,
    fontSize: 20
  },
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1000,
  },
  menu: {
    position: 'absolute',
    top: 0,
    backgroundColor: color2,
    height: '100%',
    width: '100%',
    paddingTop: 100,
    zIndex: 999,
  },
  genreBox:{
    paddingLeft: 10
  },
  genreText:{
    color: white,
    padding: 10,
    fontSize: 20
  }
});
