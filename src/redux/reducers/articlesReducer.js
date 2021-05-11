/* eslint-disable array-callback-return */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */

const initialState = {
  articles: [],
  article: null,
  articlesCount: 0,
  page: 1,
  tags: 1,
  editArticle: { tagList: [], author: { username: '' } },
  loading: false,
  error: false,
  apiFullfield: false,
};

const articlesReducer = (state = initialState, action) => {
  let { articles, articlesCount, page, editArticle } = state;
  switch (action.type) {
    case 'GET_ARTICLES':
      articles = action.articles.articles;
      articlesCount = action.articles.articlesCount;
      return { ...state, articles, articlesCount, error: false, loading: false, apiFullfield: true };

    case 'GET_ARTICLE':
      return { ...state, articles, article: action.article.article, loading: false, error: false, apiFullfield: true };

    case 'GET_PAGE':
      page = action.page;
      return { ...state, page };

    case 'GET_EDIT_MY_ARTICLE':
      editArticle = action.card;
      return { ...state, editArticle, apiFullfield: false };

    case 'LIKE_ARTICLE':
      const like = action.slug;
      articles = articles.map((item) => {
        if (item.slug === like) {
          item.favorited = true;
          item.favoritesCount += 1;
        }
        return item;
      });
      return { ...state, articles, error: false, loading: false };

    case 'DISLIKE_ARTICLE':
      const dislike = action.slug;
      articles = articles.map((item) => {
        if (item.slug === dislike) {
          item.favorited = false;
          item.favoritesCount -= 1;
        }
        return item;
      });
      return { ...state, articles, error: false, loading: false };

    case 'ARTICLES_DATA_REJECTED':
      return { ...state, error: true, loading: false, apiFullfield: false };

    case 'ARTICLES_DATA_PENDING':
      return { ...state, error: false, loading: true, apiFullfield: false };

    case 'ARTICLES_DATA_FULLFIELD':
      return { ...state, error: false, loading: false, apiFullfield: false };

    default:
      return state;
  }
};

export default articlesReducer;
