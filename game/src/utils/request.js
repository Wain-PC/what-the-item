import axios from "axios";

const request = async (endpoint, params = {}, options = {}) => {
  console.log(`Requesting ${endpoint} with ${params}`);
  const { data } = await axios.request({
    method: "post",
    url: `/api/${endpoint}`,
    params,
    ...options
  });
  return data;
};

export default request;
