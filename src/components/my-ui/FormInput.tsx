import {
  Box,
  Text,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup
} from '@chakra-ui/react';
import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import { FormState, UseFormRegister } from 'react-hook-form';
import { Form } from '@/hooks/useTestForm';
interface IPorps {
  children?: ReactNode;
  name: keyof Form;
  register: UseFormRegister<Form>;
  formState: FormState<Form>;
  placeholder?: string;
  title: string;
  isRequired?: boolean;
}

//泛型约束
const FormInput: FC<IPorps> = ({
  name,
  register,
  formState: { errors },
  placeholder,
  title,
  isRequired
}) => {
  return (
    <Box>
      <Flex alignItems="center" justifyContent="center">
        <Box w="225px" height="24px">
          <Flex>
            <Text color="gray.700" fontSize="16px" fontWeight="500" lineHeight="24px">
              {title}
            </Text>
            {isRequired && (
              <Text
                color="var(--Alert-02, #EB1607)"
                fontFamily="Inter"
                fontSize="16px"
                fontWeight="400"
                lineHeight="24px">
                *
              </Text>
            )}
          </Flex>
        </Box>

        <InputGroup marginTop="17px">
          <FormControl isInvalid={!!errors.name}>
            <Input
              w="520px"
              h="48px"
              padding="10px 16px"
              alignItems="center"
              {...register(name)}
              borderRadius="6px"
              border="1px solid var(--Gray-04, #CFCCC2)"
              bg="var(--Gray-01, #FAF9F5)"
              placeholder={placeholder}
              title="姓名"
              color="#8A877C"
            />
            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl>
        </InputGroup>
      </Flex>
    </Box>
  );
};
export default memo(FormInput);
