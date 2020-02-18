import axios from "axios";

const request = async (endpoint, params = {}, options = {}) => {
  const { data } = await axios.request({
    method: "post",
    url: `/api/admin/${endpoint}`,
    data: params,
    ...options
  });
  return data;
};

export default request;
