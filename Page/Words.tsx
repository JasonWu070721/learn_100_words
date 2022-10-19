import React, {useState, useCallback, useEffect} from 'react';
import {View, Button, SafeAreaView, FlatList} from 'react-native';
import {ListItem} from '@rneui/themed';
import Tts from 'react-native-tts';
import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

Tts.setDefaultLanguage('en-US');
Tts.setDucking(true);

function speakWord(name: string) {
  Tts.stop();
  Tts.getInitStatus().then(() => {
    console.log(name);
    Tts.speak(name);
  });
}

const Words = ({navigation}: any) => {
  const [storedWordsItems, setStoredWordsItems] = useState<any[]>([]);

  const getDBConnection = async () => {
    return SQLite.openDatabase({
      name: 'database.db',
      location: 'default',
      createFromLocation: '~/database.db',
    });
  };

  const getWordItems = async (db: SQLiteDatabase) => {
    try {
      const wordItems: any[] = [];
      const results = await db.executeSql(
        'SELECT * FROM words WHERE type="level_1" LIMIT 50',
      );
      results.forEach((result: any) => {
        for (let index = 0; index < result.rows.length; index++) {
          wordItems.push(result.rows.item(index));
        }
      });
      return wordItems;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get getWordItems !!!');
    }
  };

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      let storedWordItems = await getWordItems(db);

      if (storedWordItems.length) {
        setStoredWordsItems(storedWordItems);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const renderItem = ({item}: any) => (
    <ListItem key={item.id} bottomDivider onPress={() => speakWord(item.en)}>
      <ListItem.Content>
        <ListItem.Title>{item.en}</ListItem.Title>
        <ListItem.Subtitle>{item.zh_tw}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <SafeAreaView>
      <Button
        title="Go to Words Screen"
        onPress={() => navigation.navigate('Login')} // We added an onPress event which would navigate to the About screen
      />
      <View>
        <FlatList data={storedWordsItems} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
};

export default Words;
