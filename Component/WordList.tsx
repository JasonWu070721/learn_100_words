import React, {useState, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {ListItem} from '@rneui/themed';
import Tts from 'react-native-tts';

import Realm from 'realm';

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

Tts.setDefaultLanguage('en-US');
Tts.setDucking(true);

function speakWord(name: string) {
  Tts.stop();
  Tts.getInitStatus().then(() => {
    console.log(name);
    Tts.speak(name);
  });
}

const getWordItemsRealm = async () => {
  const wordItems: any[] = [];
  const realm = await Realm.open({
    path: 'myrealm',
    schema: [WordSchema],
  });

  const level = realm.objects('level_1');
  const openTasks = level.filtered('_id < 100');

  for (const i in openTasks) {
    wordItems.push(openTasks[i]);
  }

  console.log(wordItems);

  return wordItems;
};

const renderItem = ({item}: any) => {
  return (
    <ListItem key={item._id} bottomDivider onPress={() => speakWord(item.en)}>
      <ListItem.Content>
        <ListItem.Title>{item.en}</ListItem.Title>
        <ListItem.Subtitle>{item.zh_tw}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

const WordList = () => {
  const [words, setWords] = useState<Word[]>();

  useEffect(() => {
    (async () => {
      const WordItems = await getWordItemsRealm();
      setWords(WordItems);
    })();
  }, []);

  return (
    <View>
      <FlatList data={words} renderItem={renderItem} />
    </View>
  );
};

export default WordList;
