/* eslint-disable no-underscore-dangle */
import Api from '../services/Api';

const api = new Api();

export const getAllArticles = (articles) => ({ type: 'GET_ARTICLES', articles });

export const getPage = (page) => ({ type: 'GET_PAGE', page });

export const catchError = () => ({ type: 'CATCH_ERROR' });

// export const getUser = (user) => ({ type: 'GET_TOKEN', user });

export const loginUser = (user) => ({ type: 'LOGIN_USER', user });

export const showLoading = () => ({ type: 'SHOW_LOADING' });

export const finishLoading = () => ({ type: 'FINISH_LOADING' });

export const logout = () => ({ type: 'LOGOUT' });

function __getData(apiMethod, action, data) {
  return (dispatch) => {
    apiMethod(data)
      .then((res) => {
        dispatch(showLoading());
        dispatch(action(res));
        dispatch(finishLoading());
      })
      .catch(() => dispatch(catchError()));
  };
}

export const articlesFetchData = (page) => __getData(api.getArticles, getAllArticles, page);

export const registrationFetchData = (data) => __getData(api.postNewUser, loginUser, data);

export const loginFetchData = (data) => __getData(api.loginUser, loginUser, data);

export const getCurrentUser = (token) => __getData(api.getCurrentUser, loginUser, token);
