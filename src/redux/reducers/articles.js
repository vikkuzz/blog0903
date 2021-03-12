/* eslint-disable no-param-reassign */

const initialState = {
  articles: [],
  articlesCount: 0,
  page: 1,
  loading: true,
  error: false,
};

const articlesReducer = (state = initialState, action) => {
  let { articles, articlesCount, page } = state;
  switch (action.type) {
    case 'GET_ARTICLES':
      articles = action.articles.articles;
      articlesCount = action.articles.articlesCount;
      return { ...state, articles, articlesCount, loading: false };

    case 'GET_PAGE':
      page = action.page;
      return { ...state, page, loading: true };

    case 'CATCH_ERROR':
      return { ...state, error: true };

    default:
      return state;
  }
};

export default articlesReducer;
