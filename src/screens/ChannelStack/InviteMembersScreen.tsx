import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import {useAuth} from '../../shared/utils/AuthContext.js';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useChatContext} from 'stream-chat-expo';
import UserListItem from '../../components/UserListItem';

const InviteMembersScreen = () => {
  const {client} = useChatContext();
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const {userId} = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const channel = route.params.channel;
  const fetchUsers = async () => {
    const existingMembers = await channel.queryMembers({});
    const existingMemberIds = existingMembers.members.map(m => m.user_id);
    console.log(existingMemberIds);
    const res = await client.queryUsers({
      id: {$nin: existingMemberIds},
    });
    console.log('res is', res);
    setUsers(res.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const selectUser = user => {
    if (selectedUserIds.includes(user.id)) {
      setSelectedUserIds(existingUsers =>
        existingUsers.filter(id => id !== user.id),
      );
    } else {
      setSelectedUserIds(existingUsers => [...existingUsers, user.id]);
    }
  };

  const inviteUsers = async () => {
    await channel.addMembers(selectedUserIds);
    navigation.goBack();
  };

  return (
    <FlatList
      data={users}
      renderItem={({item}) => (
        <UserListItem
          user={item}
          onPress={selectUser}
          isSelected={selectedUserIds.includes(item.id)}
        />
      )}
      ListHeaderComponent={() =>
        !!selectedUserIds.length && (
          <Button title="Invite" onPress={inviteUsers} />
        )
      }
    />
  );
};

export default InviteMembersScreen;
