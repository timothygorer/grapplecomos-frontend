import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useGetVolumeChaptersData} from '../../hooks/useGetVolumeChaptersData.js';
import {useNavigation} from '@react-navigation/native';
import SectionRow from '../../components/Home/SectionRow.js';
import {HFlatList} from 'react-native-head-tab-view';
import {getChapterContent} from '../../shared/utils/games.js';
import slugify from 'slugify';

const InstructionalVolumeTab = ({gameObj, routes, tabIndex, marketName}) => {
  const {title, event_status} = gameObj;
  const navigation = useNavigation();

  let {data, hasNextPage, fetchNextPage, refetch} = useGetVolumeChaptersData(
    title,
    marketName,
    '',
    '',
    '',
    event_status,
    '',
    '',
    '',
    '',
  );
  const [offersMatrix, setOffersMatrix] = React.useState({});
  const [offersData, setOffersData] = React.useState([]);
  const [marketData, setMarketData] = React.useState(null);

  useEffect(() => {
    (async () => {
      const {data} = await refetch();
      setOffersData(data);
      setMarketData(marketData);
    })();
  }, []);

  const onChapterCardRenderHandler = useCallback(
    ({item, index}) => {
      return (
        <React.Fragment key={index}>
          <SectionRow
            section={item}
            onPress={async () => {
              const result = getChapterContent(
                slugify(item.dvd_title, {
                  strict: true,
                  lower: true,
                }),
                item.volume_number,
                item.chapter_number,
                slugify(item.name, {strict: true, lower: true}),
              );
              console.log('ch content: ', result);

              navigation.navigate('NotesStack', {
                chapter_title: item.name,
                dvd_title: item.dvd_title,
                id: item.id,
                volume_title: item.volume_title,
                chapter_number: item.chapter_number,
              });
            }}
            isFirstCard={index === 0}
            isLastCard={index === offersData.length - 1}
          />
        </React.Fragment>
      );
    },
    [offersMatrix, gameObj, offersData],
  );

  const keyExtractorHandler = (item, index) => {
    return index.toString();
  };

  const fetchMoreData = () => {
    fetchNextPage();
  };

  return (
    <>
      <HFlatList
        index={tabIndex}
        showsHorizontalScrollIndicator={false}
        data={offersData}
        onEndReachedThreshold={0.001}
        onEndReached={() => {
          hasNextPage && fetchMoreData();
        }}
        renderItem={onChapterCardRenderHandler}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractorHandler}
        bounces={true}
      />
    </>
  );
};

export default React.memo(InstructionalVolumeTab);

const styles = StyleSheet.create({
  container: {
    // marginBottom: '10%',
    // marginTop: '5%',
  },
  columnWrapperStyle: {
    justifyContent: 'space-around',
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: '#F2F6FF',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject, // This ensures the overlay takes the full space of the ImageBackground
    backgroundColor: '#F2F6FF',
    opacity: 0.7,
  },
  divider: {
    height: 1,
    backgroundColor: 'gray', // Adjust this color
    // marginVertical: 8,
    width: 310,
  },
});
