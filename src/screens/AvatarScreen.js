import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Avatar, Button, Text, Icon, Alert, Overlay } from 'react-native-elements';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Camera } from 'expo-camera';
import useLibrary from '../hooks/useLibrary';
import Constants from 'expo-constants';

const AvatarScreen = () => {
  const [avatar, setAvatar] = useState();
  const [cameraOn, setCameraOn] = useState(false);

  //   const [hasPermission, setHasPermission] = useState(null);

  //   useEffect(() => {
  //     async () => {
  //       const { status } = await Camera.requestPermissionsAsync();
  //       setHasPermission(status === 'granted');
  //     };
  //   }, []);

  //   if (hasPermission === null) {
  //     return <View />;
  //   }
  //   if (hasPermission === false) {
  //     return (
  //       <Text>No access to camera or library, go to settings and reset all the permissions related to this app</Text>
  //     );
  //   }

  //   const [ratio, setRatio] = useState('4:3');
  //   const cam = useRef();

  //   const prepareRatio = async () => {
  //     if (Platform.OS === 'android' && Camera.isAvailableAsync()) {
  //       const ratios = await getSupportedRatiosAsync();

  //       console.log(ratios);

  //       // See if the current device has your desired ratio, otherwise get the maximum supported one
  //       // Usually the last element of "ratios" is the maximum supported ratio
  //       const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];

  //       setState({ ratio });
  //     }
  //   };

  //   const cameraPickerCall = async () => {
  //     setCameraOn(true);
  //   };

  //   const takePicture = async () => {
  //     if (this.camera) {
  //       let photo = await this.camera.takePictureAsync();

  //       setAvatar(photo);
  //       setCameraOn(false);
  //     }
  //   };

  // const imagePickerCall = async (component) => {
  //   if (Constants.platform.ios) {
  //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //     if (status !== 'granted') {
  //       alert('Sorry, we need camera roll permissions to make this work!');
  //     }
  //   }

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
            cameraPickerCall();
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
            <View style={{ borderRadius: 75, overflow: 'hidden' }}>
              <Text>hi</Text>
              {/* <Camera
                style={{ width: 150, height: 150 }}
                type={Camera.Constants.Type.front}
                skipProcessing={true}
                ratio="4:3"
                //ref={(cam) => (this.cam = cam)}
                onCameraReady={prepareRatio} // You can only get the supported ratios when the camera is mounted
                ratio={ratio}
              /> */}
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
