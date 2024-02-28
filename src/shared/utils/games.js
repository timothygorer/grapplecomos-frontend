import {supabase} from '../../services/supabaseClient.js';
import axios from 'axios';

export const calculateRange = (pageNumber, constant) => {
  const start = (pageNumber - 1) * constant;
  const end = start + 9;
  return [start, end];
};

export const getCategories = async () => {
  let data, error;

  ({data, error} = await supabase.from('category').select(`*`));

  return data;
};

export const getSubCategories = async () => {
  let data, error;

  ({data, error} = await supabase.from('sub_category').select(`*`));
  console.log('gsc err', data, error);

  return data;
};

export const getInstructionals = async selectedCategories => {
  let data, count, error;

  if (selectedCategories.length > 0) {
    ({data, count, error} = await supabase
      .from('tile')
      .select(`*`, {count: 'exact'})
      .overlaps(
        'categories',
        `{${selectedCategories.map(b => `"${b.name}"`)}}`,
      ));
  } else {
    ({data, count, error} = await supabase
      .from('tile')
      .select(`*`, {count: 'exact'}));
  }

  if (error) {
    throw error;
  }

  return {data, count, error};
};

export const getChapterContent = async (
  dvd_slug,
  volume_number,
  chapter_number,
  chapter_slug,
) => {
  let response;
  try {
    response = await axios.get(
      `http://localhost:54321/storage/v1/object/public/notes/${dvd_slug}/${dvd_slug}_Vol${volume_number}-${chapter_number}-${chapter_slug}_summary.html`,
    );
    // Handle the successful response here
    console.log('Response:', response.data);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
    return null;
  }
  return response.data;
};
