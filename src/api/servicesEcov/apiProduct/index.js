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
