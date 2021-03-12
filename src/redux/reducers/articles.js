/* eslint-disable no-param-reassign */

const initialState = {
  articles: [],
  articlesCount: 0,
};

const articlesReducer = (state = initialState, action) => {
  let { articles, articlesCount } = state;
  switch (action.type) {
    case 'GET_ARTICLES':
      articles = action.articles.articles;
      articlesCount = action.articles.articlesCount;
      return { ...state, articles, articlesCount };

    default:
      return state;
  }
};

export default articlesReducer;
