import React from 'react';
import {Text, View, Button} from 'react-native';

const Login = ({navigation}: any) => {
  return (
    <View>
      <Text>This is the login screen</Text>
      <Button
        title="Go to Login Screen"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

export default Login;
