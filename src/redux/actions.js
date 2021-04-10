/* eslint-disable no-underscore-dangle */
import Api from '../services/Api';

const api = new Api();

export const getAllArticles = (articles) => ({ type: 'GET_ARTICLES', articles });

export const getPage = (page) => ({ type: 'GET_PAGE', page });

export const catchError = (error) => ({ type: 'CATCH_ERROR', error });

export const clearErrorMessage = () => ({ type: 'CLEAR_ERROR_MESSAGE' });

export const loginUser = (user) => ({ type: 'LOGIN_USER', user });

export const showLoading = () => ({ type: 'SHOW_LOADING' });

export const finishLoading = () => ({ type: 'FINISH_LOADING' });

export const logout = () => ({ type: 'LOGOUT' });

export const updateUserProfile = (data) => ({ type: 'UPDATE_USER_PROFILE', data });

export const editArticle = (card) => ({ type: 'EDIT_ARTICLE', card });

export const getEditMyArticle = (card) => ({ type: 'GET_EDIT_MY_ARTICLE', card });

export const getFavoritedArticle = (article) => ({ type: 'GET_FAVORITED_ARTICLE', article });

function __getData(apiMethod, action = null, data = null, token = null, endpoint = null) {
  return (dispatch) => {
    apiMethod(data, token, endpoint)
      .then((res) => {
        if (res.errors) {
          dispatch(catchError(res.errors));
        } else {
          dispatch(showLoading());
          dispatch(action(res));
          setTimeout(() => dispatch(finishLoading()), 500);
          dispatch(clearErrorMessage());
        }
      })
      .catch((error) => {
        dispatch(catchError(error));
      });
  };
}

export const articlesFetchData = (data, token) => __getData(api.getArticles, getAllArticles, data, token);

export const registrationFetchData = (data) => __getData(api.postNewUser, loginUser, data);

export const loginFetchData = (data) => __getData(api.loginUser, loginUser, data);

export const getCurrentUser = (token) => __getData(api.getCurrentUser, loginUser, token);

export const updateProfile = (data, token) => __getData(api.updateProfile, updateUserProfile, data, token);

export const createNewArticle = (data, token) => __getData(api.postNewArticle, articlesFetchData, data, token);

export const editMyArticle = (card, token, endpoint) => __getData(api.editArticle, editArticle, card, token, endpoint);

export const deleteArticle = (token, endpoint) => __getData(api.deleteArticle, articlesFetchData, token, endpoint);

export const iLikeThisArticle = (data, token) => __getData(api.iLikeThisArticle, getFavoritedArticle, data, token);

export const dislikeThisArticle = (data, token) => __getData(api.dislikeThisArticle, getFavoritedArticle, data, token);
