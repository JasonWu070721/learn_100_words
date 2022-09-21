import React from 'react';
import {View, Button, SafeAreaView} from 'react-native';
import {ListItem} from '@rneui/themed';

import Tts from 'react-native-tts';

const list = [
  {
    id: 1,
    word: 'important',
    chinese: '重要的',
  },
  {
    id: 2,
    word: 'lend',
    chinese: '借出',
  },
];

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
  return (
    <View>
      <SafeAreaView>
        {list.map((l, i) => (
          <ListItem key={i} bottomDivider onPress={() => speakWord(l.word)}>
            <ListItem.Content>
              <ListItem.Title>{l.word}</ListItem.Title>
              <ListItem.Subtitle>{l.chinese}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </SafeAreaView>
      <Button
        title="Go to Words Screen"
        onPress={() => navigation.navigate('Login')} // We added an onPress event which would navigate to the About screen
      />
    </View>
  );
};

export default Words;
