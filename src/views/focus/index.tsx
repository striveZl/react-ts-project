import { Box, Input, Image, Button } from '@chakra-ui/react';
import React, { ChangeEventHandler, memo, useRef, useState } from 'react';
import { FC, ReactNode } from 'react';
import TransitionUse from './test/transitionUse';

interface IPorps {
  children?: ReactNode;
}

//泛型约束
const Focus: FC<IPorps> = (props) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<FileList | null>();
  const test: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.files);
    if (e.target.files) {
      setFile(e.target.files);
    }
  };

  const upFileBtn: React.MouseEventHandler<HTMLButtonElement> = () => {
    inputFile.current?.click();
  };
  return (
    <>
      <Box>
        <Input ref={inputFile} display="none" onChange={test} multiple type="file"></Input>
        <Button onClick={upFileBtn}>点击上传</Button>
        {}
        <Image src={file ? URL.createObjectURL(file[0]) : ''}></Image>
      </Box>
      <TransitionUse />
    </>
  );
};
export default memo(Focus);
