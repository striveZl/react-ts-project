import { Box, Input, Image } from '@chakra-ui/react';
import React, { ChangeEventHandler, memo, useRef, useState } from 'react';
import { FC, ReactNode } from 'react';

interface IPorps {
  children?: ReactNode;
}

//泛型约束
const Focus: FC<IPorps> = (props) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>();
  const [imgurl, setImgUrl] = useState<string>('');

  const test: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.files);
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  if (file) {
    console.log(URL.createObjectURL(file));
  }

  return (
    <Box>
      <Input onChange={test} ref={inputFile} type="file"></Input>
      <Image src={file ? URL.createObjectURL(file) : ''}></Image>
    </Box>
  );
};
export default memo(Focus);
