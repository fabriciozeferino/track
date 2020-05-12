import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Icon } from 'react-native-elements';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const AvatarScreen = () => {
  const [avatar, setAvatar] = useState();
  const [cameraOn, setCameraOn] = useState(false);

  const imagePickerCall = async (component) => {
    const { status: libraryHasPermission } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { status: cameraHasPermission } = await Permissions.askAsync(Permissions.CAMERA);

    if (cameraHasPermission === null || libraryHasPermission === null) {
      return <View />;
    }
    if (cameraHasPermission === false || libraryHasPermission === false) {
      return (
        <Text>No access to camera or library, go to settings and reset all the permissions related to this app</Text>
      );
    }

    switch (component) {
      case 'camera':
        setCameraOn(true);

        break;
      case 'library':
        let libraryImage = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        setAvatar(libraryImage);
        break;
    }
  };

  const takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();

      setAvatar(photo);
      setCameraOn(false);
    }
  };

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
            imagePickerCall('camera');
            break;
          case 1:
            imagePickerCall('library');
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
            <View style={{ borderRadius: '100%', overflow: 'hidden' }}>
              <Camera
                style={{ width: 150, height: 150 }}
                type={Camera.Constants.Type.front}
                ref={(ref) => {
                  this.camera = ref;
                }}
              />
            </View>
          ) : (
            <Avatar
              source={avatar ? { uri: avatar.uri } : require('../assets/avatar.png')}
              overlayContainerStyle={{ backgroundColor: 'white' }}
              activeOpacity={0.7}
              showEditButton
              rounded
              size="xlarge"
              onPress={() => setCameraOn(true)}
            />
          )}
        </View>
        {!cameraOn ? (
          <Button style={styles.button} onPress={onOpenActionSheet} title="Select Image" />
        ) : (
          <Button style={styles.button} color="red" onPress={() => setCameraOn(false)} title="Cancel" />
        )}
      </View>
      <View style={styles.iconPhotoContainer}>
        {cameraOn ? <Icon raised reverse name="camera" type="font-awesome" color="#f50" onPress={takePicture} /> : null}
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
    borderRadius: 50,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  button: {
    width: 150,
    margin: 5,
  },
  iconPhotoContainer: {
    alignSelf: 'flex-end',
    marginVertical: 15,
    height: 50,
  },
});
