// import {Camera} from 'react-native-vision-camera';
// import ImagePicker from 'react-native-image-crop-picker';
import {supabase} from '../supabaseClient.js';
import {decode} from 'base64-arraybuffer';
import {Alert} from 'react-native';
import {updateAvatarUrl} from '../user/user';
import {updateUser} from '../../redux/actions/authenticationActions';
import * as FileSystem from 'expo-file-system';
import {uuid} from '@supabase/supabase-js/dist/main/lib/helpers';

const avatartMaxSize = 210; // px

// export const checkCameraPermission = async () => {
//   let status = await Camera.getCameraPermissionStatus();
//   console.log('**camera-permission-status**', status);
//   if (status !== 'authorized') {
//     await Camera.requestCameraPermission();
//     status = await Camera.getCameraPermissionStatus();
//     if (status === 'denied') {
//       alert('You need to allow camera access');
//     }
//   }
// };

export const openCamera = async (username, userId, setProfile) => {
  // const image = await ImagePicker.openCamera({
  //   width: avatartMaxSize,
  //   height: avatartMaxSize,
  //   cropping: true,
  //   useFrontCamera: true,
  //   cropperCircleOverlay: true,
  //   includeBase64: true,
  //   compressImageQuality: 0.75,
  // });
  // await uploadImage(image, username, userId, setProfile);
  // return image.path;
};

export const openGallery = async (username, userId, setProfile) => {
  // console.log('__________');
  // console.log('opengallerysource opened');
  // const image = await ImagePicker.openPicker({
  //   width: avatartMaxSize,
  //   height: avatartMaxSize,
  //   cropping: true,
  //   useFrontCamera: true,
  //   cropperCircleOverlay: true,
  //   includeBase64: true,
  //   compressImageQuality: 0.75,
  // });
  // console.log('reach');
  // // await uploadImage(image, username, userId, setProfile);
  // return image;
};

export const uploadImage = async (image, username, userId, setProfile) => {
  try {
    let data, error;

    if (image) {
      const uri = image.uri;
      console.log('___________ ' + 'ok', username);
      const imageUuid = uuid();
      const userId = 'ok';

      if (username) {
        console.log(' image is ', image);
        const extension = uri?.split('.').pop() ?? 'mp4';
        const path = `${userId}/${imageUuid}.${extension}`;

        const {data: dataRemoved, error: errorRemoved} = await supabase.storage
          .from('avatars')
          .remove([path]);
        console.log('dataRemoved is ', dataRemoved, errorRemoved);

        if (errorRemoved) {
          throw errorRemoved;
        }

        // const ff = await FFmpegKit.execute(
        //   `-i ${image.uri} -vcodec h264 -acodec mp2 my-video.mp4`,
        // );
        // const out = await ff.getOutput();
        // console.log('out is ', out);

        const base64Result = await FileSystem.readAsStringAsync(image.uri, {
          encoding: 'base64',
        });

        ({data, error} = await supabase.storage
          .from('avatars')
          .upload(path, decode(base64Result), {
            contentType: 'image/jpeg',
          }));

        console.log('data is', data, path, error);

        if (error) {
          throw error;
        }

        // const publicUrl = process.env.SUPABASE_BUCKET_URL + path;
        // console.log('purl', publicUrl);
        //
        // const updatedProfile = await updateAvatarUrl(userId, publicUrl);
        // setProfile(
        //   'http://localhost:54321/storage/v1/object/public/avatars/ok/ok.jpg',
        // );
      }
    } else {
      console.log('Some error occurred. ++++++++++++', image.path);
      Alert.alert(
        'Image is too big. Please try again with a different one, or skip for now.',
      );
      throw new Error(
        'Avatar image exceeded the maximum size. Please try again with a different one, or skip for now.',
      );
    }
  } catch (error) {
    console.error('Some error occurred in openGallery: ', error);
    throw error;
  }
};
