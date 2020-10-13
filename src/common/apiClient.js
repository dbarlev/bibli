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


export const apiGetClient = async (url, method, data) => {
  return new Promise((resolve, reject) => {
      axios({ method, url: `${apiPath}${url}`, params: data})
      .then(function(response) {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

//get function
export const apiClientGetZcredit = async (url, method, data) => {
  return new Promise((resolve, reject) => {
      axios({ method, url: `${apiPath}${url}`, params: data})
      .then(function(response) {
        console.log('response api ', response);
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!! this is a test server url!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const ZcreditHeaders ={
  'Content-Type': 'application/json'
}
export const ZcreditApiClient = async (url, method, data) => {
  return new Promise((resolve, reject) => {
      axios({ method, url: `https://pci.zcredit.co.il/webcheckout/api`+`${url}`, data, ZcreditHeaders})
      .then(function(response) 
      {
        console.log('response.data', response.data)
        resolve(response.data);
        
      })
      .catch(error => {
        reject(error);
      });
  });
};
