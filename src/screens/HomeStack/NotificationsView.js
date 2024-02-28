import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import SectionRow from './SectionRow';
// import {BlurView, VibrancyView} from '@react-native-community/blur'; // Assuming you have this component

const courseSections = [
  {
    title: 'Grace Gundrum Ginger Snap',
    logo: 'https://dummyimage.com/24x24/fff/aaa',
    image: 'https://example.com/path_to_image.jpg',
    background: 'https://example.com/path_to_background.jpg',
    index: 1,
  },
  {
    title: 'Designing for iOS 14',
    logo: 'https://dummyimage.com/24x24/fff/aaa',
    image: 'https://example.com/path_to_image.jpg',
    background: 'https://example.com/path_to_background.jpg',
    index: 1,
  },
  {
    title: 'Designing for iOS 14',
    logo: 'https://dummyimage.com/24x24/fff/aaa',
    image: 'https://example.com/path_to_image.jpg',
    background: 'https://example.com/path_to_background.jpg',
    index: 1,
  },
  {
    title: 'Designing for iOS 14',
    logo: 'https://dummyimage.com/24x24/fff/aaa',
    image: 'https://example.com/path_to_image.jpg',
    background: 'https://example.com/path_to_background.jpg',
    index: 1,
  },
  {
    title: 'Designing for iOS 14',
    logo: 'https://dummyimage.com/24x24/fff/aaa',
    image: 'https://example.com/path_to_image.jpg',
    background: 'https://example.com/path_to_background.jpg',
    index: 1,
  },
];

const NotificationsView = () => {
  const [contentHasScrolled, setContentHasScrolled] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F2F6FF'}}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
      </View>
      <ImageBackground
        source={require('../../assets/Blob1.png')}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle} // This applies styles directly to the image
      >
        <View style={styles.imageOverlay} />
        <ScrollView
          onScroll={({nativeEvent}) => {
            setContentHasScrolled(nativeEvent.contentOffset.y > 0);
          }}
          scrollEventThrottle={16}>
          {/*<VibrancyView blurType="light" style={styles.sectionsContainer}>*/}
          {courseSections.map((section, index) => (
            <React.Fragment key={index}>
              <SectionRow section={section} />
              {index !== courseSections.length - 1 && (
                <View style={styles.divider} />
              )}
            </React.Fragment>
          ))}
          {/*</VibrancyView>*/}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#F2F6FF',
  },
  imageStyle: {
    top: 300,
    left: -295,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject, // This ensures the overlay takes the full space of the ImageBackground
    backgroundColor: '#F2F6FF',
    opacity: 0.5,
  },
  sectionsContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Assuming ultraThinMaterial is a semi-transparent white
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.60)',
    shadowColor: 'rgba(69, 42, 124, 0.15)',
    shadowOffset: {
      width: 0,
      height: 30, // This corresponds to the vertical shadow
    },
    shadowOpacity: 0.15, // This is the opacity of the shadow
    shadowRadius: 30, // This is the blur radius
  },
  divider: {
    height: 1,
    backgroundColor: 'gray', // Adjust this color
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15, // Adjust padding as necessary
  },
  title: {
    fontSize: 24, // Adjust size as necessary
    fontWeight: 'bold',
  },
});

export default NotificationsView;
