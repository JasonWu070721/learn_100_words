/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Realm from 'realm';

import Home from './Page/Home';
import Login from './Page/Login';
import Words from './Page/Words';

const Stack = createNativeStackNavigator();

interface Word {
  _id: number;
  en: string;
  zh_tw: string;
  part_of_speech: string;
  type: string;
}

const WordSchema = {
  name: 'level_1',
  properties: {
    _id: 'int',
    en: 'string',
    zh_tw: 'string',
    part_of_speech: 'string',
    type: 'string',
  },
  primaryKey: '_id',
};

function App(): JSX.Element {
  async function initDatabase() {
    const realm = await Realm.open({
      path: 'myrealm',
      schema: [WordSchema],
    });

    const level_1: Word[] = require('./dataset/level_1.json');

    realm.write(() => {
      realm.deleteAll();

      for (const i in level_1) {
        let ID = realm.objects('level_1').length + 1;
        console.log(level_1[i].en);

        realm.create('level_1', {
          _id: ID,
          en: level_1[i].en,
          zh_tw: level_1[i].zh_tw,
          part_of_speech: level_1[i].part_of_speech,
          type: level_1[i].type,
        });
      }
    });
  }

  useEffect(() => {
    (async () => {
      await initDatabase();
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Words" component={Words} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
