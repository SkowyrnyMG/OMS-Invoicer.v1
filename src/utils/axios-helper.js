import axios from 'axios';

const db = axios.create({
  baseURL: 'https://oms-invoicer-v1.firebaseio.com',
});

export { db };
