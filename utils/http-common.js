import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.serverUrl}/api`,
  headers: {
    'Content-type': 'application/json'
  }
});
