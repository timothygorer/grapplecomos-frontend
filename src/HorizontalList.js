import React, {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import HorizontalItem from "./HorizontalItem";
import {useData} from "./shared/utils/DataContext";

const HorizontalList = ({data = [], onPress, isSomeActive, isLeagueList}) => {
    const {selectedCategories, selectedSubcategories} = useData();
    const keyExtractorHandler = useCallback(item => `buttonId-${item.id}`, []);

    const renderSportsButtonsHandler = useCallback(
        ({item}) => {
            return (
                <HorizontalItem
                    id={item.id}
                    title={item.name}
                    active={
                        selectedCategories.filter(i => i.id === item.id).length > 0
                    }
                    key={item.id}
                    style={styles.buttonContainer}
                    onPress={onPress}
                    item={item}
                />
            );
        },
        [onPress],
    );

    const renderLeagueButtonsHandler = useCallback(
        ({item}) => (
            <HorizontalItem
                title={item.name}
                active={selectedSubcategories.filter(i => i.id === item.id).length > 0}
                key={item.id}
                style={styles.buttonContainer}
                id={item.id}
                onPress={onPress}
                item={item}
            />
        ),
        [onPress],
    );

    return (
        <FlatList
            data={data}
            renderItem={isLeagueList ? renderLeagueButtonsHandler : renderSportsButtonsHandler}
            keyExtractor={keyExtractorHandler}
            horizontal
            contentContainerStyle={
                !isSomeActive
                    ? styles.contentContainerStyle
                    : styles.contentContainerWhenSomeButtonActive
            }
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default HorizontalList;

const styles = StyleSheet.create({
    contentContainerStyle: {
        paddingHorizontal: 12,
    },
    contentContainerWhenSomeButtonActive: {
        paddingRight: 8,
        paddingLeft: 4,
    },
    buttonContainer: {
        marginHorizontal: 6,
    },
});
