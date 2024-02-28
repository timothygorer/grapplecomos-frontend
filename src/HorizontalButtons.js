import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
// import FilterClearButton from './FilterClearButton';
// import FilterModalButton from './FilterModalButton';
import {useNavigation, useTheme} from '@react-navigation/native';
import HorizontalList from "./HorizontalList";
import {useData} from "./shared/utils/DataContext";
import {useDebounce} from "./hooks/useDebounce";
import ThemedStyles from "./styles/ThemedStyles";

const HorizontalButtons = ({refresh}) => {
    const {
        allCategories,
        setAllCategories,
        allSubcategories,
        setAllSubcategories,
        selectedCategories,
        setSelectedCategories,
        selectedSubcategories,
        setSelectedSubcategories,
        categoryFilterDidPress,
        setCategoryFilterDidPress,
        subcategoryFilterDidPress,
        setSubcategoryFilterDidPress,
        availableSubcategoriesButtons,
        setAvailableSubcategoriesButtons
    } = useData()
    const removeAllActiveButtonHandler = useCallback(
        type => {
            if (type === 'sport') {
                setSelectedSportsButtons([]);
                setSelectedLeagues([]);
                // setSportsFilterDidPress(false);
            } else {
                setSelectedLeagues([]);
            }
            setSubcategoryFilterDidPress(false);
        },
        [allSubcategories, allCategories],
    );

    const handleCategoryFilterPress = item => {
        const isSportSelected = selectedCategories.some(
            button => button.id === item.id,
        );

        const updatedSelectedSportsButtons = isSportSelected
            ? selectedCategories.filter(button => button.id !== item.id)
            : [...selectedCategories, item];

        console.log('updatedSelectedSportsButtons is ', updatedSelectedSportsButtons)

        const updatedAvailableLeaguesButtons = allSubcategories.filter(league =>
            updatedSelectedSportsButtons.some(
                sport => sport.name === league.category_name,
            ),
        );

        console.log('updatedAvailableLeaguesButtons is ', updatedAvailableLeaguesButtons)

        const updatedSelectedLeagues = selectedSubcategories.filter(league =>
            updatedSelectedSportsButtons.some(
                sport => sport.name === league.category_name,
            ),
        );

        updateStates(
            updatedSelectedSportsButtons,
            updatedAvailableLeaguesButtons,
            updatedSelectedLeagues,
        );

        refresh()
    };

    // updates the selectedLeagues value based on leagues which are selected
    const handleSubcategoryFilterPress = item => {
        const isLeagueSelected = selectedSubcategories.some(
            league => league.id === item.id,
        );

        console.log('item is ', item, isLeagueSelected, 'selected scs is ', selectedSubcategories)

        const updatedSelectedLeagues = isLeagueSelected
            ? selectedSubcategories.filter(league => league.id !== item.id)
            : [...selectedSubcategories, item];

        console.log('updatedSL is now ', updatedSelectedLeagues)

        updateStates(
            selectedCategories,
            availableSubcategoriesButtons,
            updatedSelectedLeagues,
        );
    };

    const updateStates = (
        updatedSelectedSportsButtons,
        updatedAvailableLeaguesButtons,
        updatedSelectedLeagues,
    ) => {
        setAvailableSubcategoriesButtons(updatedAvailableLeaguesButtons);
        setSelectedSubcategories(updatedSelectedLeagues);
        setSelectedCategories(updatedSelectedSportsButtons);
        setCategoryFilterDidPress(updatedSelectedSportsButtons.length > 0);
        setSubcategoryFilterDidPress(updatedSelectedLeagues.length > 0);
    };

    return (
        <View
           >
            {/*<FilterModalButton*/}
            {/*    onPress={() =>*/}
            {/*        debounce(() =>*/}
            {/*            navigation.push('FilterModal', {*/}
            {/*                selectedLeaguesHomeScreen: selectedLeagues,*/}
            {/*                setSelectedLeaguesHomeScreen: setSelectedLeagues,*/}
            {/*                selectedSportsHomeScreen: selectedSportsButtons,*/}
            {/*                setSelectedSportsHomeScreen: setSelectedSportsButtons,*/}
            {/*                availableLeaguesButtons,*/}
            {/*                setAvailableLeaguesButtons: setAvailableLeaguesButtons,*/}
            {/*                setReloadAllHomeData,*/}
            {/*                setSportsFilterDidPress,*/}
            {/*            }),*/}
            {/*        )*/}
            {/*    }*/}
            {/*/>*/}
            <View style={styles.buttonsContainer}>
                {/*{sportsFilterDidPress && (*/}
                {/*    <FilterClearButton*/}
                {/*        onPress={removeAllActiveButtonHandler.bind(this, 'sport')}*/}
                {/*        color={dark ? '#AAAAAA' : '#262626'}*/}
                {/*    />*/}
                {/*)}*/}
                <HorizontalList
                    data={allCategories}
                    isSomeActive={categoryFilterDidPress}
                    isLeagueList={false}
                    onPress={handleCategoryFilterPress}
                />
            </View>
            <View style={[styles.buttonsContainer, styles.leagueButtonsContainer]}>
                {/*{categoryFilterDidPress && (*/}
                {/*    <FilterClearButton*/}
                {/*        onPress={removeAllActiveButtonHandler.bind(this, 'league')}*/}
                {/*        color={dark ? '#AAAAAA' : '#262626'}*/}
                {/*    />*/}
                {/*)}*/}
                {selectedCategories.length > 0 && (
                    <HorizontalList
                        data={availableSubcategoriesButtons}
                        isSomeActive={subcategoryFilterDidPress}
                        isLeagueList={true}
                        onPress={handleSubcategoryFilterPress}
                    />
                )}
            </View>
        </View>
    );
};


const styles = ThemedStyles.create({
    container: {
        paddingTop: 11.5,
        paddingBottom: 11.5,
        marginBottom: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        zIndex: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 12,

        elevation: 12,
        position: 'relative',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leagueButtonsContainer: {
        marginTop: 12.5,
    },
});

export default HorizontalButtons;
