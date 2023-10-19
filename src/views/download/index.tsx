import FormInput from '@/components/my-ui/FormInput';
import { Button } from '@chakra-ui/react';
import React, { memo, useState } from 'react';
import { FC, ReactNode } from 'react';
import { useTestForm } from '@/hooks/useTestForm';
import TestUploadImage from '@/components/my-ui/TestUploadImage';
interface IPorps {
  children?: ReactNode;
}
//泛型约束
const Download: FC<IPorps> = (props) => {
  const { register, formState, handleSubmit } = useTestForm();
  const [file, setFile] = useState<File | null>();
  const submit = (value: any) => {
    const reader = new FileReader();
    let base64Data: any = '';
    reader.onload = function (e) {
      const dataURL = e.target?.result;
      base64Data = dataURL ?? '';
      const input: any = {
        ...value,
        icon: base64Data
      };
      console.log(input);
      if (!file) delete input.icon;
    };

    reader.readAsDataURL(file ?? new Blob());
  };

  const changeImg = (e: any) => {
    setFile(e);
  };
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <FormInput
          name="name"
          register={register}
          formState={formState}
          placeholder="姓名"
          title="姓名"
          isRequired={true}
        />
        <FormInput
          name="nameN"
          register={register}
          formState={formState}
          placeholder="昵称"
          title="昵称"
        />
        <TestUploadImage onChangeImg={changeImg} />
        <Button type="submit">提交</Button>
      </form>
    </>
  );
};
export default memo(Download);
