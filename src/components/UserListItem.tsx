import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons';

const UserListItem = ({user, onPress, isSelected = false}) => {
    // @ts-ignore
    return (
        <Pressable
            style={styles.root}
            onPress={() => {
                console.log('uli user is', user);
                onPress(user);
            }}>
            <Image source={{uri: user.images}} style={styles.image} />
            <Text style={styles.name}>{user.name}</Text>
            <View style={{marginLeft: 'auto'}}>
                {isSelected && <AntDesign name="checkcircle" size={24} color="green" />}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    root: {flexDirection: 'row', alignItems: 'center', padding: 10},
    image: {width: 50, aspectRatio: 1, borderRadius: 25, marginRight: 10},
    name: {color: 'white', fontWeight: 'bold'},
});

export default UserListItem;
