/* eslint-disable no-underscore-dangle */
import Api from '../../services/Api';

const api = new Api();

export const catchError = (error) => ({ type: 'CATCH_ERROR', error });

export const clearErrorMessage = () => ({ type: 'CLEAR_ERROR_MESSAGE' });

export const loginUser = (user) => ({ type: 'LOGIN_USER', user });

export const logout = () => ({ type: 'LOGOUT' });

export const updateUserProfile = (data) => ({ type: 'UPDATE_USER_PROFILE', data });

export const userDataRejected = (error) => ({ type: 'USER_DATA_REJECTED', error });

export const userDataPending = () => ({ type: 'USER_DATA_PENDING' });

export const userDataFullfield = () => ({ type: 'USER_DATA_FULLFIELD' });

function getData(apiMethod, action = null, data = null, token = null, endpoint = null) {
  return (dispatch) => {
    console.log(data, token);
    apiMethod(data, token, endpoint).then((res) => {
      console.log(res);
      try {
        dispatch(userDataPending());
        dispatch(action(res));
        dispatch(userDataFullfield());
      } catch (error) {
        dispatch(userDataRejected(error));
      }
    });
  };
}

export const registrationFetchData = (data) => getData(api.postNewUser, loginUser, data);

export const loginFetchData = (data) => getData(api.loginUser, loginUser, data);

export const getCurrentUser = (token) => getData(api.getCurrentUser, loginUser, token);

export const updateProfile = (data, token) => getData(api.updateProfile, updateUserProfile, data, token);
