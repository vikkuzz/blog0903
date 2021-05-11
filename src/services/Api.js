export default class Api {
  baseAddress = `https://conduit.productionready.io/api/`;

  getArticles = async (page = 0, token = '') => {
    let headers = {};
    if (token) {
      headers = {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      };
    } else {
      headers = {
        'Content-Type': 'application/json;charset=utf-8',
      };
    }
    const res = await fetch(`${this.baseAddress}articles?offset=${page}`, { metod: 'GET', headers });
    const result = await res.json();
    return result;
  };

  postNewUser = async (data) => {
    const user = {
      user: {
        ...data,
      },
    };
    const res = await fetch(`${this.baseAddress}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });
    const result = await res.json();

    return result;
  };

  loginUser = async (data) => {
    const user = {
      user: {
        ...data,
      },
    };
    const res = await fetch(`${this.baseAddress}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });
    const result = await res.json();

    return result;
  };

  getCurrentUser = async (token) => {
    const res = await fetch(`${this.baseAddress}user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
    const result = await res.json();
    return result;
  };

  updateProfile = async (data, token) => {
    const user = {
      user: {
        ...data,
      },
    };
    const res = await fetch(`${this.baseAddress}user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(user),
    });

    const result = await res.json();
    return result;
  };

  postNewArticle = async (data, token) => {
    const article = {
      article: {
        ...data,
      },
    };
    const res = await fetch(`${this.baseAddress}articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(article),
    });
    const result = await res.json();
    return result;
  };

  editArticle = async (data, token, endpoint) => {
    const article = {
      article: {
        ...data,
      },
    };
    const res = await fetch(`${this.baseAddress}articles/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(article),
    });
    const result = await res.json();

    return result;
  };

  deleteArticle = async (token, endpoint) => {
    const res = await fetch(`${this.baseAddress}articles/${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
    const result = await res.json();
    return result;
  };

  iLikeThisArticle = async (data, token) => {
    const res = await fetch(`${this.baseAddress}articles/${data}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
    const result = await res.json();

    return result;
  };

  dislikeThisArticle = async (data, token) => {
    const res = await fetch(`${this.baseAddress}articles/${data}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
    const result = await res.json();

    return result;
  };

  getMyArticles = async (author, token) => {
    const res = await fetch(`${this.baseAddress}articles?author=${author}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
    const result = await res.json();
    return result;
  };

  getOneArticle = async (slug) => {
    const res = await fetch(`${this.baseAddress}articles/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    const result = await res.json();
    return result;
  };
}
