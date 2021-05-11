/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import Api from '../../services/Api';

const api = new Api();

export const getAllArticles = (articles) => ({ type: 'GET_ARTICLES', articles });

export const getArticle = (article) => ({ type: 'GET_ARTICLE', article });

export const getPage = (page) => ({ type: 'GET_PAGE', page });

export const editArticle = (card) => ({ type: 'EDIT_ARTICLE', card });

export const getEditMyArticle = (card) => ({ type: 'GET_EDIT_MY_ARTICLE', card });

export const articlesDataRejected = (error) => ({ type: 'ARTICLES_DATA_REJECTED', error });

export const articlesDataPending = () => ({ type: 'ARTICLES_DATA_PENDING' });

export const articlesDataFullfield = () => ({ type: 'ARTICLES_DATA_FULLFIELD' });

export const apiFullfield = () => ({ type: 'API_FULLFIELD' });

export const likeArticle = (slug) => ({ type: 'LIKE_ARTICLE', slug });

export const dislikeArticle = (slug) => ({ type: 'DISLIKE_ARTICLE', slug });

function getData(apiMethod, action = null, data = null, token = null, endpoint = null) {
  return (dispatch) => {
    dispatch(articlesDataPending());
    apiMethod(data, token, endpoint)
      .then((res) => {
        dispatch(apiFullfield());
        dispatch(action(res));
      })
      .catch((error) => {
        dispatch(articlesDataRejected(error));
      });
  };
}

function postLike(apiMethod, data, token) {
  return (dispatch) => {
    apiMethod === api.iLikeThisArticle ? dispatch(likeArticle(data)) : dispatch(dislikeArticle(data));
    apiMethod(data, token);
  };
}

export const articlesFetchData = (data, token) => getData(api.getArticles, getAllArticles, data, token);

export const createNewArticle = (data, token) => getData(api.postNewArticle, articlesFetchData, data, token);

export const editMyArticle = (card, token, endpoint) =>
  getData(api.editArticle, articlesFetchData, card, token, endpoint);

export const deleteArticle = (token, endpoint) => getData(api.deleteArticle, articlesFetchData, token, endpoint);

export const iLikeThisArticle = (data, token) => postLike(api.iLikeThisArticle, data, token);

export const dislikeThisArticle = (data, token) => postLike(api.dislikeThisArticle, data, token);

export const getMyArticles = (author, token) => getData(api.getMyArticles, getAllArticles, author, token);

export const getOneArticle = (slug) => getData(api.getOneArticle, getArticle, slug);
