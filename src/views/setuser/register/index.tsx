import React, { memo,useEffect, useState } from 'react';
import { FC, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, z } from 'zod';
import { FormControl, Input, FormLabel, FormErrorMessage, Flex, Button } from '@chakra-ui/react';
import { sendRex, verifyRex,registerPhone} from '../service';
interface IPorps {
  children?: ReactNode;
}
const schema: ZodType<FromData> = z
  .object({
    nickname: z.string().min(2, { message: '最少输两个字符串！' }),
    phone: z.string().regex(/^1(3|4|5|6|7|8|9)\d{9}$/, { message: '手机号码格式有误！' }),
    password: z.string().min(6, '密码不能少于6位！'),
    captcha: z.string()
  })
  .refine(async(data) => {
    const myVerify= await verifyRex(data.phone,data.captcha)
    console.log(myVerify)
    return myVerify.code===200
  },{message:"手机或验证码错误！",path:["captcha"]});

type FromData = {
  nickname: string;
  phone: string;
  password: string;
  captcha: string;
};
//{pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/}
//泛型约束
const Register: FC<IPorps> = (props) => {
  const [isSend, setIsSend] = useState<boolean>(true);
  const [s, setS] = useState<number>(60);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError
  } = useForm<FromData>({ resolver: zodResolver(schema) })
  ;
  const onSubmit =async (data: FromData) => {
    console.log(data)
    const res = await registerPhone(data)
    if(res.code===200){
        console.log("成功！",res)
    }else{
        console.log("失败！",res)
    }
  };

  //发送验证码
  const sendRexBtn = async () => {
    console.log(getValues('phone'));
     const sendRes =await sendRex(getValues("phone"))
     //sendRes.code === 200
    if (sendRes.code === 200) {
        setS(60)
      setIsSend(false);
      setTimeout(() => {
        setIsSend(true);
      },60000);
    }else{
        console.log(sendRes)
        setError("phone", {
            type: "manual",
            message: sendRes.message,
        })
    }
  };

  useEffect(() => {
    let timer:any = null;
    if (!isSend && s !== 0) {
      timer = setInterval(() => {
        setS(val=>val-1);
      },1000);
      setTimeout(()=>{
        console.log(111)
        clearInterval(timer)
      },60000)
    } 
  }, [isSend]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.nickname} w="300px">
          <FormLabel htmlFor="nickname">昵称</FormLabel>
          <Input id="nickname" placeholder="请输入昵称" {...register('nickname')}></Input>
          <FormErrorMessage>{errors.nickname && errors.nickname.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phone} w="300px">
          <FormLabel htmlFor="phone">手机号码</FormLabel>
          <Input id="phone" placeholder="请输入电话号码" {...register('phone')}></Input>
          <FormErrorMessage>{errors.phone && errors.phone.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} w="300px">
          <FormLabel htmlFor="password">密码</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="请输入密码"
            {...register('password')}></Input>
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.captcha} w="300px">
          <FormLabel htmlFor="captcha">验证码</FormLabel>
          <Flex>
            <Input id="captcha" placeholder="验证码" {...register('captcha')}></Input>
            {isSend ? (
              <Button w="200px" onClick={sendRexBtn}>
                &nbsp;&nbsp;获取验证码&nbsp;&nbsp;
              </Button>
            ) : (
              <Button w="200px">{s}</Button>
            )}
          </Flex>
          <FormErrorMessage>{errors.captcha && errors.captcha.message}</FormErrorMessage>
        </FormControl>
        <Input marginTop="10px" w="100px" type="submit" />
      </form>
    </>
  );
};
export default memo(Register);
