import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Alert,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Tweet from '../../components/general/tweet';
// import tweets from '../../../../assets/data/tweets';
import {Entypo} from '@expo/vector-icons';
// import {Link} from 'expo-router';
import {useEffect, useState} from 'react';
import {useTweetsApi} from '../../components/general/tweets';
import {useQuery} from '@tanstack/react-query';

export default function FeedScreen() {
  const {listTweets} = useTweetsApi();

  // const {data, isLoading, error} = useQuery({
  //   queryKey: ['tweets'],
  //   queryFn: listTweets,
  // });
  const data = [
    {
      id: '1',
      user: {
        name: 'John Doe',
        username: '@johndoe',
        image: 'https://via.placeholder.com/50',
      },
      content: 'This is the first tweet content.',
      image: 'https://via.placeholder.com/600x400',
      numberOfComments: 10,
      numberOfRetweets: 5,
      numberOfLikes: 20,
      impressions: 100,
    },
    {
      id: '2',
      user: {
        name: 'Jane Smith',
        username: '@janesmith',
        image: 'https://via.placeholder.com/50',
      },
      content: 'This is the second tweet content.',
      numberOfComments: 8,
      numberOfRetweets: 3,
      numberOfLikes: 15,
      impressions: 80,
    },
    {
      id: '3',
      user: {
        name: 'Alice Johnson',
        username: '@alicejohnson',
        image: 'https://via.placeholder.com/50',
      },
      content: 'This is the third tweet content.',
      numberOfComments: 12,
      numberOfRetweets: 7,
      numberOfLikes: 25,
      impressions: 120,
    },
    {
      id: '4',
      user: {
        name: 'Bob Brown',
        username: '@bobbrown',
        image: 'https://via.placeholder.com/50',
      },
      content: 'This is the fourth tweet content.',
      image: 'https://via.placeholder.com/600x400',
      numberOfComments: 5,
      numberOfRetweets: 2,
      numberOfLikes: 10,
      impressions: 50,
    },
    {
      id: '5',
      user: {
        name: 'Charlie Davis',
        username: '@charliedavis',
        image: 'https://via.placeholder.com/50',
      },
      content: 'This is the fifth tweet content.',
      numberOfComments: 18,
      numberOfRetweets: 9,
      numberOfLikes: 30,
      impressions: 150,
    },
  ];

  const isLoading = false;
  const error = false;

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <SafeAreaView style={styles.page}>
      <FlatList data={data} renderItem={({item}) => <Tweet tweet={item} />} />

      {/*<Link href="/new-tweet" asChild>*/}
      <Entypo
        name="plus"
        size={24}
        color="white"
        style={styles.floatingButton}
      />
      {/*</Link>*/}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  floatingButton: {
    backgroundColor: '#1C9BF0',

    borderRadius: 25,
    padding: 15,

    position: 'absolute',
    right: 15,
    bottom: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    overflow: 'hidden',
  },
});
