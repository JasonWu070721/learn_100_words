import React from 'react';
import {Text, View, Button} from 'react-native';

const Practice = ({navigation}: any) => {
  return (
    <View>
      <Text>This is the Practice screen</Text>
      <Button
        title="Go to Practice Screen"
        onPress={() => {
          navigation.navigate('Words');
        }}
      />
    </View>
  );
};

export default Practice;
