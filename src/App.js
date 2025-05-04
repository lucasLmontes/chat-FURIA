import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './services/firebase';
import TelaChat from './screens/TelaChat'

const Stack = createStackNavigator();

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
      <Stack.Navigator initialRouteName='Chat'>
        <Stack.Screen
          name='Chat'
          component={TelaChat}
          options={{title: 'Chat da FURIA'}}
        />
      </Stack.Navigator>
  );
};

export default App;
