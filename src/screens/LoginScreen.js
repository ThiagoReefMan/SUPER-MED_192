import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // adicione aqui a lógica de autenticação do usuário
    console.log(`Usuário: ${username}, Senha: ${password}`);
  };

  const handleSignUp = () => {
    // adicione aqui a lógica de criação de uma nova conta de usuário
    console.log(`Criando uma nova conta para o usuário: ${username}`);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: 'YOUR_ANDROID_CLIENT_ID',
        iosClientId: 'YOUR_IOS_CLIENT_ID',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        console.log('Login com o Google bem-sucedido:', result);
      } else {
        console.log('Login com o Google cancelado');
      }
    } catch (e) {
      console.error('Erro ao fazer login com o Google:', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>AUTENTICAÇÃO</Text>

        <View style={styles.inputContainer}>
          <Ionicons style={styles.icon} name="person" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            placeholderTextColor="#777"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons style={styles.icon} name="lock-closed" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#777"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        
      </View>
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Criar uma nova conta</Text>
      </TouchableOpacity>
      <br></br>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <Ionicons style={styles.icon} name="logo-google" size={24} color="blue" />
          <Text style={styles.googleButtonText}> Entrar com o Google </Text>
        </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'top',
    alignItems: 'center',
    paddingTop: 20,
  },
  loginContainer: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 20,
  },
  inputContainer: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10
  },
  loginTitle: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F5F5F5',
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'deepskyblue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'blue',
   
  },
  googleButtonText: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupButton: {
    marginTop: 30,
  },
  signupButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'normal',
  },
});

export default App;
