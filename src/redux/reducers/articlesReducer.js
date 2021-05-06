/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */

const initialState = {
  articles: [],
  articlesCount: 0,
  page: 1,
  tags: 1,
  editArticle: { tagList: [], author: { username: '' } },
  loading: true,
  error: false,
};

const articlesReducer = (state = initialState, action) => {
  let { articles, articlesCount, page, editArticle, myArticles } = state;
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

    case 'GET_FAVORITED_ARTICLE':
      const favArt = action.article.article;
      const articleId = articles.findIndex((item) => item.slug === favArt.slug);
      articles[articleId] = favArt;
      return { ...state, articles };

    case 'ARTICLES_DATA_REJECTED':
      return { ...state, error: true, loading: false };

    case 'ARTICLES_DATA_PENDING':
      return { ...state, error: false, loading: true };

    case 'ARTICLES_DATA_FULLFIELD':
      return { ...state, error: false, loading: false };

    case 'GET_MY_ARTICLES':
      myArticles = action.articles.articles;
      return { ...state, myArticles };

    default:
      return state;
  }
};

export default articlesReducer;
