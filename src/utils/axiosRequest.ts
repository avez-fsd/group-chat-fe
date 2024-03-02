import axios from 'axios';

/**
 * @description axios hook
 * @param {import('axios').AxiosRequestConfig} obj
 * @returns {Promise<{ data: any, isError: boolean, error: any }>}
 */
const axiosRequest = async (obj:any) => {
  let error;
  let isError = false;

  try {
    const { data, status } = await axios.request(obj);

    return { data, status, isError, error };
  } catch (err:any) {
    if (err.response && err.response.data) {
      if (typeof err.response.data === 'string') {
        error = err.response.data;
      } else {
        error = err.response.data.message || err.response.data.data;
      }
    } else {
      error = err.message;
    }

    isError = true;

    return { data: null, status: 400, isError, error };
  }
};

export default axiosRequest;
