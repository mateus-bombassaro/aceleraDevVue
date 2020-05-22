import axios from 'axios';

export const getRepoInfo = (user) => {
  const url = `https://api.github.com/users/${user}/repos`;
  return axios.get(url, { headers: { accept: 'application/json' } });
};
