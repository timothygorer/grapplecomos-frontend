import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import data from '../../../data.json';
import {MaterialIcons} from '@expo/vector-icons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {openCamera, openGallery} from '../../services/camera/camera';
import {useDispatch} from 'react-redux';
import {useAuth} from '../../shared/utils/AuthContext';

const ProfilePictureBottomSheet = ({
  refRBSheet,
  username,
  userId,
  setProfilePhotoPath,
}) => {
  const dispatch = useDispatch();
  const {authStatus, profile, setProfile} = useAuth();

  return (
    <RBSheet
      ref={ref => {
        refRBSheet.current = ref;
      }}
      height={330}
      closeOnDragDown
      customStyles={{
        container: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
      }}>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Add Profile Picture</Text>
        {data.lists.map(list => (
          <TouchableOpacity
            key={list.icon}
            style={styles.listButton}
            onPress={async () => {
              try {
                console.log('PPBS profile is ', profile);
                if (profile) {
                  if (list.label === 'Choose image') {
                    const imagePath = await openGallery(
                      profile.username,
                      profile.id,
                      setProfile,
                    );
                    setProfilePhotoPath(imagePath);
                  } else if (list.label === 'Take photo') {
                    const imagePath = await openCamera(
                      profile.username,
                      profile.id,
                      setProfile,
                    );
                    setProfilePhotoPath(imagePath);
                  } else if (list.label === 'View profile picture') {
                    refRBSheet.current.close();
                  }
                }
              } catch (error) {
                console.error(
                  "Didn't upload image due to error in openGallery or openPhoto: ",
                  error,
                );
              }
            }}>
            <MaterialIcons name={list.icon} style={styles.listIcon} />
            <Text style={styles.listLabel}>{list.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 25,
  },
  listTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  listButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  listIcon: {
    fontSize: 26,
    color: '#666',
    width: 60,
  },
  listLabel: {
    fontSize: 16,
  },
});

export default ProfilePictureBottomSheet;
