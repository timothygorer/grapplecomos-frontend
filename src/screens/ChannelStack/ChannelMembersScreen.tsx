import {useNavigation, useRoute} from '@react-navigation/native';
import {View, Text, FlatList, Button} from 'react-native';
import {useEffect, useState} from 'react';
import UserListItem from '../../components/UserListItem';

const ChannelMembersScreen = () => {
  const [members, setMembers] = useState([]);
  const route = useRoute();
  const channel = route.params.channel;
  const navigation = useNavigation();

  useEffect(() => {
    fetchMembers();
  }, [channel]);

  const fetchMembers = async () => {
    const res = await channel.queryMembers({});
    console.log('res: =>', res);
    setMembers(res.members);
  };

  return (
    <FlatList
      data={members}
      keyExtractor={item => item.user_id}
      renderItem={({item}) => (
        <UserListItem user={item.user} onPress={() => {}} />
      )}
      ListHeaderComponent={() => (
        <Button
          title="Invite members"
          onPress={() => {
            navigation.navigate('InviteMembers', {channel});
          }}
        />
      )}
    />
  );
};

export default ChannelMembersScreen;
