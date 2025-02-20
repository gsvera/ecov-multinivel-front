import axiosInstance from "../../";

const BASE_URL = "/affiliate";

export const apiAffiliate = {
  getHerarchyAffiliate: function () {
    return axiosInstance.get(`${BASE_URL}/get-affiliate-tree`);
  },
  getDataAffiliate: function (pageParams) {
    const { page, size, word } = pageParams;
    return axiosInstance.get(
      `${BASE_URL}/get-data-affiliate?page=${page}&size=${size}${
        word && "&word=" + word
      }`
    );
  },
  getDataAffiliateByUser: function (idUser) {
    return axiosInstance.get(
      `${BASE_URL}/get-affiliate-tree/by-user?id-user=${idUser}`
    );
  },
};

export default apiAffiliate;
