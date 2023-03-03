import React from 'react';
import {View, SafeAreaView} from 'react-native';

import WordList from '../Component/WordList';

const Words = () => {
  return (
    <SafeAreaView>
      <View>
        <WordList />
      </View>
    </SafeAreaView>
  );
};

export default Words;
