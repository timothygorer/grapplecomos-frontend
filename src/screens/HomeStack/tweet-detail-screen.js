import {ActivityIndicator, Text, SafeAreaView} from 'react-native';
import Tweet from '../../components/general/tweet';
// import {useSearchParams} from 'expo-router';
import {useQuery} from '@tanstack/react-query';
import {useTweetsApi} from '../../components/general/tweets';

export default function TweetScreen() {
  const id = 5;
  // const {id} = useSearchParams();
  const {getTweet} = useTweetsApi();
  const isLoading = false;
  const error = false;

  // const {data, isLoading, error} = useQuery({
  //   queryKey: ['tweet', id],
  //   queryFn: () => getTweet(id),
  // });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Tweet {id} not found!</Text>;
  }

  return (
    <SafeAreaView>
      <Tweet
        tweet={{
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
        }}
      />
    </SafeAreaView>
  );
}
