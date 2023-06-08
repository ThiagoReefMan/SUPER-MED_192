import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const StarOfLifeScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [occurrences, setOccurrences] = useState([]);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photoConfirmed, setPhotoConfirmed] = useState(false);
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const buttonOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (photoConfirmed) {
      blinkButton();
    }
    else {
      buttonOpacity.setValue(1);
    }
  }, [photoConfirmed]);

  const blinkButton = () => {
    Animated.sequence([
      Animated.timing(buttonOpacity, {
        toValue: 0.3,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (photoConfirmed) {
        blinkButton();
      }
    });
  };

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status === 'granted') {
      setCameraOpen(true);
    }
  };

  const closeCamera = () => {
    setCameraOpen(false);
  };

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhoto(photo);
    }
  };

  const confirmPhoto = () => {
    setPhotoConfirmed(true);
    setCameraOpen(false);
    const currentDate = new Date();
    setDate(currentDate.toLocaleDateString());
    setTime(currentDate.toLocaleTimeString());
    getLocation();
  };

  const retakePhoto = () => {
    setPhoto(null);
    setPhotoConfirmed(false);
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão de acesso à localização negada');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const registerOccurrence = () => {
    const occurrence = {
      text: text,
      photo: photo,
      date: date,
      time: time,
      location: location,
    };
    setOccurrences((prevOccurrences) => [...prevOccurrences, occurrence]);
    setText('');
    setPhoto(null);
    setPhotoConfirmed(false);
    setLocation(null);
    setDate(null);
    setTime(null);
    navigation.navigate('Camadas', { occurrences: [...occurrences, occurrence] });
  };

  const deleteOccurrence = (index) => {
    const updatedOccurrences = [...occurrences];
    updatedOccurrences.splice(index, 1);
    setOccurrences(updatedOccurrences);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nos informe a natureza da ocorrência...</Text>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Digite aqui a ocorrência"
        multiline={true}
        textAlignVertical="top"
        maxLength={100}
      />
      <Button title="Abrir câmera" onPress={requestCameraPermission} style={styles.button} />
      <Animated.View style={{ opacity: buttonOpacity }}>
        <Button
          title="Registrar ocorrência"
          onPress={registerOccurrence}
          disabled={!photoConfirmed}
          style={styles.button}
        />
      </Animated.View>
      {hasPermission && cameraOpen && (
        <Camera
          style={styles.camera}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          {photo ? (
            <View style={styles.previewContainer}>
              <Image style={styles.previewImage} source={{ uri: photo.uri }} />
              <TouchableOpacity style={styles.closeButton} onPress={retakePhoto}>
                <MaterialIcons name="close" size={24} color="white" />
              </TouchableOpacity>
              <View style={styles.confirmPhotoButtons}>
                <Button title="Sim" onPress={confirmPhoto} />
                <Button title="Não" onPress={retakePhoto} />
              </View>
            </View>
          ) : (
            <Button title="Tirar foto" onPress={takePicture} />
          )}
        </Camera>
      )}
      {photoConfirmed && (
        <View>
          <Image style={styles.photo} source={{ uri: photo.uri }} />
          <Text>Data: {date}</Text>
          <Text>Hora: {time}</Text>
          {location && (
            <Text>
              Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
            </Text>
          )}
        </View>
      )}
      {occurrences.length > 0 && (
        <FlatList
          data={occurrences}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.occurrenceItem}>
              <Text style={styles.occurrenceHeader}>OCORRÊNCIA Nº {index + 1}</Text>
              {item.photo && <Image style={styles.photo} source={{ uri: item.photo.uri }} />}
              <View style={styles.occurrenceDetails}>
                <Text style={styles.occurrenceText}>{item.text}</Text>
                <Text style={styles.occurrenceText}>Data: {item.date}</Text>
                <Text style={styles.occurrenceText}>Hora: {item.time}</Text>
                {item.location && (
                  <Text style={styles.occurrenceText}>
                    Latitude: {item.location.coords.latitude}, Longitude: {item.location.coords.longitude}
                  </Text>
                )}
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    textAlignVertical: 'top',
    padding: 10,
  },
  button: {
    marginTop: 20,
  },
  camera: {
    flex: 1,
    marginTop: 10,
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: '90%',
    height: '90%',
    margin: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  confirmPhotoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: -50,
  },
  photo: {
    width: 250,
    height: 250,
    marginTop: 10,
    alignSelf: 'center',
  },
  occurrenceItem: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  occurrenceHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  occurrenceDetails: {
    marginTop: 5,
  },
  occurrenceText: {
    marginBottom: 5,
  },
});

export default StarOfLifeScreen;
