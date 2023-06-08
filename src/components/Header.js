import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={require('/src/img/estrela-da-vida.png')} style={styles.image} />
      <Text style={styles.title1}>SUPER-MED 192</Text>
      <Text style={styles.title2}>RESGATE DE URGÊNCIA</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title1: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    padding: 10,


    
  },
  title2: {
    fontSize: 20,
    color: 'white',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default Header;
