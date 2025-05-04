import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './services/firebase';

const App = () => {
  useEffect(() => {
    const buscarDados = async () => {
      const consulta = await getDocs(collection(db, 'colecao-teste'));
      consulta.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    };
    buscarDados();
  }, []);

  return (
    <View>
      <Text>Conexão com o Firebase configurada!</Text>
    </View>
  );
};

export default App;
