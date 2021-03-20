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

    const res = await fetch(`https://conduit.productionready.io/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });
    const result = await res.json();

    return result;
  };
}
