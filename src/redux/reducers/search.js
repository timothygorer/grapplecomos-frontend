const initialState = {
  query: '',
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH':
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;
