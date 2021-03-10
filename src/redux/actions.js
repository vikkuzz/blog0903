import Api from '../services/Api';

const api = new Api();

export const getAllArticles = (articles) => ({ type: 'GET_ARTICLES', articles });

export function articlesFetchData() {
  return (dispatch) => {
    api
      .getArticles()
      .then((res) => {
        dispatch(getAllArticles(res));
      })
      .catch((e) => e);
  };
}
