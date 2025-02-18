import axiosInstance from "../../";

const BASE_URL = "/affiliate";

export const apiAffiliate = {
  getHerarchyAffiliate: function () {
    return axiosInstance.get(`${BASE_URL}/get-affiliate-tree`);
  },
  getDataAffiliate: function () {
    return axiosInstance.get(`${BASE_URL}/get-data-affiliate`);
  },
};

export default apiAffiliate;
