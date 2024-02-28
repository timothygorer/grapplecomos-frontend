import {useQuery} from '@tanstack/react-query';
import moment from 'moment-timezone';
import {supabase} from './src/services/supabaseClient';

export default function useGetDates() {
  function findClosestFutureDateOrToday(dateList, today) {
    // Filter out dates earlier than today's date
    let filteredDates = dateList.filter(date =>
      moment(date).isSameOrAfter(today, 'day'),
    );

    if (filteredDates.length === 0) {
      return null; // No future date in the list
    }

    // Find the date in the filtered list that is closest to today's date
    let closestDate = filteredDates.reduce((closest, current) => {
      let closestDiff = Math.abs(moment(closest).diff(today, 'days'));
      let currentDiff = Math.abs(moment(current).diff(today, 'days'));
      return currentDiff < closestDiff ? current : closest;
    });

    return closestDate;
  }

  function findClosestPastDate(dateList, today) {
    // Filter out dates earlier than today's date
    let filteredDates = dateList.filter(date =>
      moment(date).isBefore(today, 'day'),
    );

    if (filteredDates.length === 0) {
      return null; // No future date in the list
    }

    // Find the date in the filtered list that is closest to today's date
    let closestDate = filteredDates.reduce((closest, current) => {
      let closestDiff = Math.abs(moment(closest).diff(today, 'days'));
      let currentDiff = Math.abs(moment(current).diff(today, 'days'));
      return currentDiff < closestDiff ? current : closest;
    });

    return closestDate;
  }

  const getDates = async () => {
    let data = [],
      error;
    const today = moment().format('YYYY-MM-DD');

    ({data, error} = await supabase.rpc('get_unique_dates', {
      user_timezone: moment.tz.guess(),
    })); // fetches leagues / sports if they have pastevents from the past 14 days or events in the future

    const fetchedDates = data.map(d => d.event_date);

    if (fetchedDates.length > 0) {
      const closestFutureDateOrToday = findClosestFutureDateOrToday(
        fetchedDates,
        today,
      );
      const closestPastDate = findClosestPastDate(fetchedDates, today);

      if (closestFutureDateOrToday) {
        const datesList = data.map((d, index) =>
          d.event_date === closestFutureDateOrToday
            ? {...d, selected: true, index}
            : {...d, selected: false, index},
        );

        if (today === closestFutureDateOrToday) {
          return {
            datesList,
          };
        } else {
          return {
            datesList,
          };
        }
      } else if (closestPastDate) {
        const datesList = data.map((d, index) =>
          d.event_date === closestPastDate
            ? {...d, selected: true, index}
            : {...d, selected: false, index},
        );
        return {
          datesList,
        };
      }
    }
    return {datesList: []};
  };

  return useQuery(['dates'], getDates, {enabled: false});
}
