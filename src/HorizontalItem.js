import React, {memo} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Platform, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useTheme} from '@react-navigation/native';
// import FastImage from 'react-native-fast-image';

const HorizontalItem = ({active, title, imageUrl, style, onPress, id, item}) => {
    const {dark} = useTheme();

    const lightThemeTextColor = active ? '#060606' : '#262626';
    const darkThemeTextColor = active ? '#FFFFFF' : '#E7E7E7';
    const lightThemeBackgroundColor = active ? '#DCDEE0' : '#F2F2F2';
    const darkThemeBackgroundColor = active ? '#42464C' : '#2F3135';

    const gradientColor = active
        ? ['#9E00FE', '#6058F8']
        : ['#4B4B4B', '#4B4B4B'];

    const dynamicalBackground = {
        backgroundColor: dark
            ? darkThemeBackgroundColor
            : lightThemeBackgroundColor,
    };
    const dynamicalColor = {
        color: dark ? darkThemeTextColor : lightThemeTextColor,
    };

    return (
        <TouchableOpacity
            style={[styles.mainContainer, style]}
            onPress={onPress && onPress.bind(this, item)}>
            <LinearGradient
                colors={gradientColor}
                style={styles.outerContainer}
                start={{x: 0.0, y: 1.0}}
                end={{x: 1.0, y: 1.0}}>
                <View style={[styles.innerContainer, dynamicalBackground]}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: 'https://dummyimage.com/24x24/fff/aaa',
                        }}
                    />
                    <Text style={[styles.title, dynamicalColor]}>
                        {title || 'Button'}
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default memo(HorizontalItem);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    outerContainer: {
        paddingHorizontal: 1.5,
        paddingVertical: 1.5,
        borderRadius: 32,
    },
    innerContainer: {
        borderRadius: 32,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'SFUIDisplay',
        marginLeft: 5,
    },
    image: {
        width: 24,
        height: 24,
    },
});
