import axiosInstance from "../../";

const BASE_URL = "/product";

export const apiProduct = {
  getAll: function () {
    return axiosInstance.get(`${BASE_URL}/get-products`);
  },
  getProductByUser: function (idUser) {
    return axiosInstance.get(
      `${BASE_URL}/get-articles-by-user?id-user=${idUser}`
    );
  },
  getPurchasedProductByFilter: function (pageParams) {
    const { page, size, word } = pageParams;
    return axiosInstance.get(
      `${BASE_URL}/get-purchased-product-by-filter?page=${page}&size=${size}${
        word && "&word=" + word
      }`
    );
  },
  getQuotaDetailByProduct: function (idProduct) {
    return axiosInstance.get(
      `${BASE_URL}/get-quotas-by-product?id-product=${idProduct}`
    );
  },
  confirmBuyProduct: function (data) {
    return axiosInstance.post(`${BASE_URL}/buy-product-by-integration`, data);
  },
  confirmBuyByDeposit: function (data) {
    return axiosInstance.post(`${BASE_URL}/buy-product-by-deposit`, data);
  },
};

export default apiProduct;
