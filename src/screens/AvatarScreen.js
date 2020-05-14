import React, { useState } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Avatar, Button, Icon } from 'react-native-elements';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { useActionSheet } from '@expo/react-native-action-sheet';

import useLibrary from '../hooks/useLibrary';
import Constants from 'expo-constants';
import CameraComponent from '../components/CameraComponent';

const AvatarScreen = () => {
  const [avatar, setAvatar] = useState();
  const [cameraOn, setCameraOn] = useState(false);
  const [takePicture, setTakePicture] = useState(false);

  const [imagePickerCall, error] = useLibrary(setAvatar);

  if (error === 'no_permission') {
    alert('Sorry, we need camera roll permissions to make this work!');

    if (Constants.platform.ios) {
      Linking.openURL('app-settings:');
    }
  }

  async function uploadImage() {
    const data = new FormData();

    data.append('avatar', {
      uri: avatar.uri,
      type: avatar.type,
    });

    await Axios.post('http://localhost:3333/files', data);
  }

  // Action Sheet
  const { showActionSheetWithOptions } = useActionSheet();
  const onOpenActionSheet = () => {
    const options = ['Open Camera', 'Choose From Library', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        title: 'Profile Photo',
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            setCameraOn(true);

            break;
          case 1:
            imagePickerCall();
            break;
        }
      }
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {cameraOn ? (
            <CameraComponent
              setTakePicture={setTakePicture}
              takePicture={takePicture}
              setCameraOn={setCameraOn}
              setAvatar={setAvatar}
            />
          ) : (
            <Avatar
              source={avatar ? { uri: avatar.uri } : require('../assets/avatar.png')}
              overlayContainerStyle={{ backgroundColor: 'white' }}
              activeOpacity={0.7}
              rounded
              size="xlarge"
              onPress={() => setCameraOn(true)}
            />
          )}
        </View>
        {!cameraOn ? (
          <Button containerStyle={{ width: 150, margin: 5 }} onPress={onOpenActionSheet} title="Select Image" />
        ) : (
          <Button
            containerStyle={{ width: 150, margin: 5 }}
            color="red"
            onPress={() => setCameraOn(false)}
            title="Cancel"
          />
        )}
      </View>
      <View style={styles.iconPhotoContainer}>
        {cameraOn ? (
          <Icon raised reverse name="camera" type="font-awesome" color="#f50" onPress={() => setTakePicture(true)} />
        ) : null}
      </View>
    </>
  );
};

const ConnectedApp = connectActionSheet(AvatarScreen);

export default ConnectedApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    //borderRadius: 50,
  },
  avatarContainer: {
    margin: 30,
    height: 150,
  },

  iconPhotoContainer: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginBottom: 30,
    height: 50,
  },
});
