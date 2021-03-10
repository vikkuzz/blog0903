/* eslint-disable no-param-reassign */

const initialState = {
  articles: [],
};

const articles = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ARTICLES':
      state.articles = action.articles;
      return { ...state };

    default:
      return state;
  }
};

export default articles;
