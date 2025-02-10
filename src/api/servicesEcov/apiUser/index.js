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
  sendRecoveryPassword: function (email) {
    return axiosInstance.post(`${BASE_URL}/recovery-password?email=${email}`);
  },
  validExpiredTokenRecoveryPassword: function (token) {
    return axiosInstance.get(
      `${BASE_URL}/valid-expired-token-recovery-password?token=${token}`
    );
  },
  saveNewPassword: function (data) {
    return axiosInstance.put(`${BASE_URL}/save-new-password`, data);
  },
};

export default apiUser;
