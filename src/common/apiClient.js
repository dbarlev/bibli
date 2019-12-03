import axios from "axios";
import apiPath from "../constants/api";

export const apiClient = async (url, method, data) => {
  return new Promise((resolve, reject) => {
      axios({ method, url: `${apiPath}${url}`, data})
      .then(function(response) {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
