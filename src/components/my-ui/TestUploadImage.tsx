import { AddIcon } from '@/components/my-ui/icon/AddIcon';
import { Box, Flex, Text, Image } from '@chakra-ui/react';
import React, { ChangeEventHandler, memo, useCallback, useRef, useState } from 'react';
import { FC, ReactNode } from 'react';
interface IPorps {
  children?: ReactNode;
  onChangeImg: (file: File | null) => void;
}

//泛型约束
const TestUploadImage: FC<IPorps> = ({ onChangeImg }) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const uploadImgClick = useCallback(() => {
    imgRef.current?.click();
  }, []);
  const uploadImg: ChangeEventHandler<HTMLInputElement | null> = useCallback(
    (e) => {
      console.log('触发');
      if (e.target.files) {
        setFile(e.target.files[0]);
        onChangeImg(e.target.files[0]);
      }
    },
    [onChangeImg]
  );
  const delImage: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    e.stopPropagation();
    setFile(null);
  }, []);
  return (
    <Box>
      <input
        hidden
        type="file"
        ref={imgRef}
        onChange={uploadImg}
        onClick={(event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
          const element = event.target as HTMLInputElement;
          element.value = '';
        }}
      />
      <Flex minW="745px">
        <Box w="225px" h="24px">
          <Text
            color="gray.700"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="500"
            lineHeight="24px">
            上传图片
          </Text>
        </Box>
        <Box w="520px">
          <Flex
            marginTop="17px"
            w="163px"
            h="163px"
            alignItems="center"
            justifyContent="center"
            borderRadius="16px"
            border="2px solid var(--Gray-03, #EBE9E0)"
            bg="var(--white,#fff)"
            onClick={uploadImgClick}>
            {file ? (
              <Box pos="relative">
                <Image
                  w="163px"
                  h="163px"
                  src={file ? URL.createObjectURL(file) : ''}
                  borderRadius="16px"
                />
                <Box
                  pos="absolute"
                  bottom="0"
                  h="32px"
                  bgColor="blackAlpha.400"
                  w="100%"
                  lineHeight="32px"
                  borderRadius="0 0 16px 16px"
                  cursor="pointer"
                  onClick={delImage}>
                  <Text textAlign="center" color="white" fontWeight={700}>
                    删除
                  </Text>
                </Box>
              </Box>
            ) : (
              <Box>
                <AddIcon color="#ABA89D" w="48px" h="48px" />
                <Text color="var(--Gray-05, #ABA89D)">登録する</Text>
              </Box>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
export default memo(TestUploadImage);
