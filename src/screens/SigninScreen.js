import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { NavigationEvents, SafeAreaView } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';

const SigninScreen = ({ navigation }) => {
  const { register, setValue, handleSubmit, errors } = useForm();

  const {
    state: { errorMessage },
    signin,
    clearErrorMessage,
  } = useContext(AuthContext);

  const onSubmit = ({ email, password }) => {
    console.log({ email, password });
    clearErrorMessage();
    signin({ email, password });
  };

  const initialState = () => {
    return {
      focusDescriptionInput: false,
    };
  };

  const handleTitleInputSubmit = () => {
    this.setState({ focusDescriptionInput: true });
  };

  // Register validation
  useEffect(() => {
    register({ name: 'email' }, { required: true });
    register({ name: 'password' }, { required: true });
  }, [register]);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />

      <KeyboardAvoidingView behavior="padding" style={styles.form}>
        <Spacer>
          <Text
            h3
            style={{
              marginVertical: 25,
              alignSelf: 'center',
              fontWeight: '700',
            }}
          >
            Sign in
          </Text>
        </Spacer>

        <Input
          name="email"
          onChangeText={(text) => {
            clearErrorMessage();
            setValue('email', text, true);
          }}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoFocus={true}
          autoCorrect={false}
          errorMessage={errors.email && 'Email is required'}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => password.focus()}
          placeholder="Email"
        />

        <Spacer />
        <Input
          name="password"
          onChangeText={(text) => {
            clearErrorMessage();
            setValue('password', text, true);
          }}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="none"
          errorMessage={errors.password && 'Password is required'}
          blurOnSubmit={false}
          ref={(input) => (password = input)}
          onSubmitEditing={handleSubmit(onSubmit)}
          returnKeyType="done"
          placeholder="Password"
        />

        {errorMessage ? (
          <>
            <View style={styles.alert}>
              <MaterialIcons name="error-outline" size={24} color="#FF453A" />
              <Text style={{ color: '#FF453A' }}>{errorMessage}</Text>
            </View>
          </>
        ) : null}

        <Button title="Sign in" style={{ marginHorizontal: 10, marginTop: 40 }} onPress={handleSubmit(onSubmit)} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
});
