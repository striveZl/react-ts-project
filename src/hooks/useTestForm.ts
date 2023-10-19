import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


export type Form = {
  name:string,
  nameN:string
}

export const useTestForm = ()=>{
  type Schema = z.infer<typeof schema>;
  const schema = z.object({
    name: z.string().min(3, { message: '最少三个字符呀！' }),
    nameN:z.string()
  });
  const {
    register,
    handleSubmit,
    formState
  } = useForm<Schema>({ resolver: zodResolver(schema) });
  return {register,handleSubmit,formState}
}




