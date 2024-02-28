import React, {useState} from 'react';
import * as NetInfo from '@react-native-community/netinfo';
import {supabase} from '../../services/supabaseClient';

const DataContext = React.createContext();

export default function DataProvider({children}) {
  const [allCategories, setAllCategories] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [categoryFilterDidPress, setCategoryFilterDidPress] = useState(false);
  const [subcategoryFilterDidPress, setSubcategoryFilterDidPress] =
    useState(false);
  const [availableSubcategoriesButtons, setAvailableSubcategoriesButtons] =
    useState([]);
  const [dates, setDates] = useState([]);

  React.useEffect(() => {
    (async () => {
      const {data: categoryData, error} = await supabase
        .from('category')
        .select('*');
      if (!error) {
        setAllCategories(categoryData);
      }
      const {data: subcategoryData, error: subcategoryError} = await supabase
        .from('sub_category')
        .select('*');
      if (!subcategoryError) {
        setAllSubcategories(subcategoryData);
        console.log('subcat is ', subcategoryData);
      }
    })();
  }, []);

  const value = {
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
    setAvailableSubcategoriesButtons,
    dates,
    setDates,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return React.useContext(DataContext);
}
