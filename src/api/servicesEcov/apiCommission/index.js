import axiosInstance from "../../";

const BASE_URL = "/commission";

export const apiCommission = {
  getByFilterData: function (pageParams) {
    const { page, size, word } = pageParams;
    return axiosInstance.get(
      `${BASE_URL}/get-filter-data?page=${page}&size=${size}${
        word && "&word=" + word
      }`
    );
  },
};

export default apiCommission;
