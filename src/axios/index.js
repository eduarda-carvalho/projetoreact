import axios from "axios";

function getApi() {
  const api = axios.create({
    baseURL: "https://www.homologacao.windel.com.br:3000",
  });
  return api;
}

export const api = getApi();
