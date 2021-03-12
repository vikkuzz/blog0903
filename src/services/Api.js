export default class Api {
  baseAddress = `https://conduit.productionready.io/api/`;

  getArticles = async (page) => {
    const res = await fetch(`${this.baseAddress}articles?offset=${page}`);
    const result = await res.json();

    return result;
  };
}
