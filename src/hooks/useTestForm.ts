import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type Form = {
  name: string;
  nameN: string;
  selectBox: string;
};

export const useTestForm = () => {
  type Schema = z.infer<typeof schema>;
  const schema = z.object({
    name: z.string().min(3, { message: '最少三个字符呀！' }),
    nameN: z.string(),
    selectBox: z.string()
  });
  const { register, handleSubmit, formState, control } = useForm<Schema>({
    resolver: zodResolver(schema)
  });
  return { register, handleSubmit, formState, control };
};
