import axios from 'axios';
import moment from 'moment';
const api = 'http://localhost:1338';

export const fetchPosts = async () => {
  const { data } = (await axios.get(`${api}/api/threads`)).data;
  return data.map(item => ({
    ...item,
    created_at: moment(item.created_at).format('DD/MM/YYYY'),
  }));
};

export const getThread = async slug => {
  const { data } = (await axios.get(`${api}/api/threads/${slug}`)).data;
  return {
    created_at: moment(data.created_at).format('DD/MM/YYYY'),
    created_by: data.user.name,
    body: data.body,
    replies: data.replies.map(item => ({
      ...item,
      created_at: moment(item.created_at).format('DD/MM/YYYY'),
    })),
    title: data.title,
    total_replies: data.total_replies,
  };
};
