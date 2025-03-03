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
  confirmPayByBuy: function (data) {
    const { idPay, idBuy } = data;
    return axiosInstance.put(
      `${BASE_URL}/confirmed-buy-by-pay?id-pay=${idPay}${
        idBuy ? "&id-buy=" + idBuy : ""
      }`
    );
  },
};

export default apiPayment;
