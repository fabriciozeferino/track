import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

const CameraComponent = ({ takePicture, setTakePicture, setAvatar, setCameraOn }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [ratio, setRatio] = useState(null);
  const cameraRef = useRef();

  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCameraPermission(status === 'granted');
    };

    checkPermission();
  }, [setHasCameraPermission]);

  useEffect(() => {
    console.log('takePicture', takePicture);
    if (takePicture) snap();

    setTakePicture(false);
  }, [takePicture]);

  const snap = async () => {
    //if (await cameraRef.current.isAvailableAsync()) {

    let photo = await cameraRef.current.takePictureAsync();
    setAvatar(photo);
    setCameraOn(false);

    //}
  };

  const prepareRatio = async () => {
    if (Platform.OS === 'android') {
      const ratios = await cameraRef.current.getSupportedRatiosAsync();
      console.log(ratios);

      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const idealRatio = ratios.find((ratio) => ratio === '4:3') || ratios[ratios.length - 1];

      setRatio('4:3');
      console.log(ratio);
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={styles.preview}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={Camera.Constants.Type.front}
          skipProcessing={true}
          ref={cameraRef}
          onCameraReady={prepareRatio}
          ratio={'16:9'}
        ></Camera>
      </View>
    );
  }
};

export default CameraComponent;

const styles = StyleSheet.create({
  preview: {
    height: 150,
    width: 150,
    borderRadius: 75,
    overflow: 'hidden',
  },
  camera: {
    height: 266,
    width: 150,
    marginTop: -58,
  },
});
