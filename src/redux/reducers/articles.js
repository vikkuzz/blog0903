/* eslint-disable no-param-reassign */

const initialState = {
  articles: [],
  articlesCount: 0,
  page: 0,
  loading: true,
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

    default:
      return state;
  }
};

export default articlesReducer;
