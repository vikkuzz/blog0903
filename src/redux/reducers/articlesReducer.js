/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */

const initialState = {
  articles: [],
  articlesCount: 0,
  page: 1,
  tags: 1,
  editArticle: { tagList: [] },
};

const articlesReducer = (state = initialState, action) => {
  let { articles, articlesCount, page, editArticle } = state;
  switch (action.type) {
    case 'GET_ARTICLES':
      articles = action.articles.articles;
      articlesCount = action.articles.articlesCount;
      return { ...state, articles, articlesCount };

    case 'GET_PAGE':
      page = action.page;
      return { ...state, page };

    case 'GET_EDIT_MY_ARTICLE':
      editArticle = action.card;
      return { ...state, editArticle };

    default:
      return state;
  }
};

export default articlesReducer;
