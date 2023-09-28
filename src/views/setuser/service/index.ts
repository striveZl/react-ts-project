import hyRequest from '@/service';

export const sendRex = (phone: string) => {
  return hyRequest.get({
    url: '/captcha/sent',
    params: {
      phone
    }
  });
};

//验证验证码
export const verifyRex = (phone:string,userRegex:string)=>{
    return hyRequest.get({
        url:'/captcha/verify',
        params:{
            phone,
            captcha:userRegex
        }
    })
}

export const registerPhone = (fromRjester:object)=>{
    return hyRequest.get({
        url:'/register/cellphone',
        params:fromRjester
    })
}

//游客登陆
export const touristLoginOne = ()=>{
    return hyRequest.get({
        url:'/register/anonimous'
    })
}