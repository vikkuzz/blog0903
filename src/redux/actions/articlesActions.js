import Api from '../../services/Api';

const api = new Api();

export const getAllArticles = (articles) => ({ type: 'GET_ARTICLES', articles });

export const getPage = (page) => ({ type: 'GET_PAGE', page });

export const editArticle = (card) => ({ type: 'EDIT_ARTICLE', card });

export const getEditMyArticle = (card) => ({ type: 'GET_EDIT_MY_ARTICLE', card });

export const getFavoritedArticle = (article) => ({ type: 'GET_FAVORITED_ARTICLE', article });

export const articlesDataRejected = (error) => ({ type: 'ARTICLES_DATA_REJECTED', error });

export const articlesDataPending = () => ({ type: 'ARTICLES_DATA_PENDING' });

export const articlesDataFullfield = () => ({ type: 'ARTICLES_DATA_FULLFIELD' });

export const getOnlyMyArticles = (articles) => ({ type: 'GET_MY_ARTICLES', articles });

function getData(apiMethod, action = null, data = null, token = null, endpoint = null) {
  return (dispatch) => {
    console.log(data);
    apiMethod(data, token, endpoint)
      .then((res) => {
        dispatch(articlesDataPending());
        dispatch(action(res));
        dispatch(articlesDataFullfield());
      })
      .catch((error) => {
        dispatch(articlesDataRejected(error));
      });
  };
}

export const articlesFetchData = (data, token) => getData(api.getArticles, getAllArticles, data, token);

export const createNewArticle = (data, token) => getData(api.postNewArticle, articlesFetchData, data, token);

export const editMyArticle = (card, token, endpoint) => getData(api.editArticle, editArticle, card, token, endpoint);

export const deleteArticle = (token, endpoint) => getData(api.deleteArticle, articlesFetchData, token, endpoint);

export const iLikeThisArticle = (data, token) => getData(api.iLikeThisArticle, getFavoritedArticle, data, token);

export const dislikeThisArticle = (data, token) => getData(api.dislikeThisArticle, getFavoritedArticle, data, token);

export const getMyArticles = (author, token) => getData(api.getMyArticles, getOnlyMyArticles, author, token);
