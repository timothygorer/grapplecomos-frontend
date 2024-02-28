import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const PlaceholderCourseItem = ({
  course,
  model,
  onUpdateModel,
  isCarouselBlock,
  randomImage,
}) => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../../assets/Background8.jpg')}
      style={styles.container(isCarouselBlock)}>
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <View
            style={{
              width: isCarouselBlock ? 300 : 150,
              height: 34,
              backgroundColor: 'rgba(231, 232, 246, 0.75)',
              borderRadius: 10,
            }}
          />
          <View
            style={{
              marginTop: 8,
              width: isCarouselBlock ? 300 : 150,
              height: 18,
              backgroundColor: 'rgba(231, 232, 246, 0.75)',
              borderRadius: 5,
            }}
          />
        </View>
      </View>
    </ImageBackground>
    // <ImageBackground
    //   source={randomImage}
    //   style={styles.container(isCarouselBlock)}>
    //   <TouchableOpacity
    //     style={styles.container(isCarouselBlock)}
    //     onPress={() => {
    //       // Logic to handle the card tap event
    //       console.log('course:', course);
    //       navigation.navigate('NotesStack', {
    //         course,
    //       });
    //     }}>
    //     <View style={styles.infoContainer}>
    //       <View style={styles.textContainer}>
    //         <Text style={styles.title}>{course.title}</Text>
    //         <Text style={styles.subtitle}>20 videos - 3 hours</Text>
    //         <Text style={styles.description}>
    //           A complete guide to designing for iOS 14 with videos, examples and
    //           design...
    //         </Text>
    //       </View>
    //     </View>
    //   </TouchableOpacity>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: isCarouselBlock => ({
    height: isCarouselBlock ? 350 : 300,
    width: isCarouselBlock ? 350 : 300,
    borderRadius: 30,
    overflow: 'hidden',
  }),
  logo: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 50,
    height: 50,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    opacity: 0.7,
    color: 'white',
  },
  description: {
    fontSize: 12,
    opacity: 0.7,
    color: 'white',
  },
});

export default PlaceholderCourseItem;
