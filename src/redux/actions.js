import Api from '../services/Api';

const api = new Api();

export const getAllArticles = (articles) => ({ type: 'GET_ARTICLES', articles });

export const getPage = (page) => ({ type: 'GET_PAGE', page });

export function articlesFetchData(page) {
  return (dispatch) => {
    api
      .getArticles(page)
      .then((res) => {
        dispatch(getAllArticles(res));
      })
      .catch((e) => e);
  };
}
