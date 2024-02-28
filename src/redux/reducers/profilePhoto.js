const initialState = {
  photo_uri: null,
};

const profilePhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_PROFILE_PHOTO':
      return {
        ...state,
        photo_uri: action.payload,
      };
    case 'DELETE_PROFILE_PHOTO':
      return {
        ...state,
        photo_uri: null,
      };
    default:
      return state;
  }
};

export default profilePhotoReducer;
