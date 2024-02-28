import {useEffect, useState} from 'react';
import React from 'react';
import {useChatContext} from 'stream-chat-expo';
import {FlatList} from 'react-native';
import UserListItem from '../../components/UserListItem';
import {useAuth} from '../../shared/utils/AuthContext.js';
import {useNavigation} from '@react-navigation/native';

const UserListScreen = () => {
  const {client} = useChatContext();
  const [users, setUsers] = useState([]);
  const {userId} = useAuth();
  const navigation = useNavigation();
  const fetchUsers = async () => {
    const res = await client.queryUsers({});
    console.log('res is', res);
    setUsers(res.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startChannel = async user => {
    const channel = client.channel('messaging', {
      members: [userId, user.id],
    });
    await channel.create();
    navigation.navigate('ChannelScreen', {channel});
  };

  return (
    <FlatList
      data={users}
      renderItem={({item}) => (
        <UserListItem user={item} onPress={startChannel} />
      )}
    />
  );
};

export default UserListScreen;
