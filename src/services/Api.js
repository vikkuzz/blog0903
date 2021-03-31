export default class Api {
  baseAddress = `https://conduit.productionready.io/api/`;

  getArticles = async (page) => {
    const res = await fetch(`${this.baseAddress}articles?offset=${page}`);
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
}
