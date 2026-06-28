import request from '@/utils/request.js'
export const searchService = (searchData) => {
   return request.get('/search/searchKeyword', {
      params: { keyword :searchData }
   });
};

export const loginService = (loginData) => {
  return request.post('/user/login', loginData); 
}

export const getUserInfoService = () => {
  return request.get('/user/test');  
}
}