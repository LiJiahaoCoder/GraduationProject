// axios
import Axios from "axios";
// and conponent
import { Toast } from "antd-mobile";

// 拦截请求
Axios.interceptors.request.use(function(config) {
  Toast.loading('loading...', 0);
  return config;
});

// 拦截相应
Axios.interceptors.response.use(function(config) {
  Toast.hide();
  return config;
})