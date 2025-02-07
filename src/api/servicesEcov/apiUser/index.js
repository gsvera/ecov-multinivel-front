import axiosInstance from "../..";

const BASE_URL = "/user/public";
const BASE_AUTH_URL = "/auth/user";

export const apiUser = {
  login: function (data) {
    return axiosInstance.post(`${BASE_URL}/login`, data);
  },
  logout: function () {
    return axiosInstance.post(`${BASE_AUTH_URL}/logout`);
  },
};

export default apiUser;
