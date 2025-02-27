import axiosInstance from "../../";

const BASE_URL = "/payment";

export const apiPayment = {
  getByFilterData: function (pageParams) {
    const { page, size, word } = pageParams;
    return axiosInstance.get(
      `${BASE_URL}/get-by-filter-data?page=${page}&size=${size}${
        word && "&word=" + word
      }`
    );
  },
};

export default apiPayment;
