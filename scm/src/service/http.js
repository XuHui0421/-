import Vue from 'vue'
import Axios from 'axios'
import {baseUrl} from './connection.js'
import {Message} from 'element-ui'
import cookie from '../assets/js/utils'
import router from '../router'

const instance1 = Axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    'X-Requested-With': 'XMLHttpRequest'
  }
});
const instance2 = Axios.create({
  baseURL: baseUrl,//"http://47.93.28.3:9002/scf/",
  headers: {
    "Content-Type": "application/json",
    'X-Requested-With': 'XMLHttpRequest'
  }
});

instance1.interceptors.response.use(function (response) {
    if (response.data.status == 200) {
        return response.data;
      } else {
        Message.error(response.data.errorMessage);
        return Promise.reject(response.data);
      }
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            //   Message.error(error.response);
            break;
  
        }
      }
      return Promise.reject(error.response.data)
});

instance2.interceptors.request.use(config => {
    let user = JSON.parse(cookie.getCookie("user"));
    if (user) {
        if(config.params){
            for(var key in config.params){
                if(!config.params[key] && config.params[key] !== 0){
                    delete config.params[key];
                }
            }
            config.params.uid = user.uid;
        }else{
            config.params = {
                uid: user.uid
            };
        }
    }
    // if (user) {
    //     config.params ? config.params.uid = user.uid : config.params = {
    //       uid: user.uid
    //     };
    //   }
    return config;
  },
  err => {
    return Promise.reject(err);
  });
instance2.interceptors.response.use(function (response) {
    if (response.data.status == 200) {
      return response.data;
    } else if (response.data.status == 403) { //用户身份过期
      Message.error(response.data.errorMessage);
      router.push({
        path: '/login'
      }); //跳转到登录页面
      cookie.delCookie("user"); //清空用户信息   
      return Promise.reject(response);
    } else {
      Message.error(response.data.errorMessage);
      return Promise.reject(response.data);
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          //   Message.error(error.response);
          break;

      }
    }
    return Promise.reject(error.response.data)

  });
Vue.prototype.$logaxios = instance1;
Vue.prototype.$axios = instance2;
