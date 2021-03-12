export default class Api {
  baseAddress = `https://conduit.productionready.io/api/`;

  getArticles = async () => {
    const res = await fetch(`${this.baseAddress}articles`);
    const result = await res.json();

    return result;
  };
}
