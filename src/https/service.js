import axios from "axios";

const baseURL = "http://localhost:3000";

export const createWalletAPI = async (name, balance) => {
  const url = `${baseURL}/setup`;
  return axios
    .post(url, { name, balance })
    .then((res) => res.data)
    .catch((error) => error);
};

export const getWalletDetailsAPI = async (id) => {
  const url = `${baseURL}/wallet/${id}`;
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => error);
};

export const createTransactionAPI = async (id, description, amount) => {
  const url = `${baseURL}/transact/${id}`;
  return axios
    .post(url, { description, amount })
    .then((res) => res.data)
    .catch((error) => error);
};

export const getTransactionsAPI = async (id, skip, limit) => {
  const url = `${baseURL}/transactions?walletId=${id}&&skip=${
    skip || 0
  }&&limit=${limit || 0}`;
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => error);
};
