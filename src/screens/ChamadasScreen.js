import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ChamadasScreen = () => {
  const route = useRoute();
 
  return (
    <View>
      <Text>FLATLIST RELAÇÃO DAS OCORRÊNCIAS</Text>
      <Text>FLATLIST RELAÇÃO DAS OCORRÊNCIAS</Text>
      <Text>FLATLIST RELAÇÃO DAS OCORRÊNCIAS</Text>
      <Text>FLATLIST RELAÇÃO DAS OCORRÊNCIAS</Text>
      <Text>FLATLIST RELAÇÃO DAS OCORRÊNCIAS</Text>
      <Text>FLATLIST RELAÇÃO DAS OCORRÊNCIAS</Text>
      <FlatList
       
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
            {/* Renderizar outras informações da ocorrência */}
          </View>
        )}
      />
    </View>
  );
};

export default ChamadasScreen;
