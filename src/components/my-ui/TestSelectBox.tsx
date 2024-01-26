import { Form } from '@/hooks/useTestForm';
import { Box, Center, Flex, FormControl, Input, InputGroup, Text } from '@chakra-ui/react';
import { type } from 'os';
import React, { memo, useCallback } from 'react';
import { FC, ReactNode } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FormState,
  UseFormRegister
} from 'react-hook-form';
interface IPorps {
  children?: ReactNode;
  placeholder: string;
  title: string;
  name: keyof Form;
  register: UseFormRegister<Form>;
  formState: FormState<Form>;
  isRequired?: boolean;
  control: Control<Form, Object>;
}

const checkedMakers = [{ id: '1', name: 'strive' }];
//泛型约束
const TestSelectBox: FC<IPorps> = ({
  title,
  name,
  register,
  formState,
  placeholder,
  isRequired,
  control
}) => {
  type FieldName = 'selectBox';
  const createSelectMenu = useCallback(<T extends FieldName>(fieldName: FieldName) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dataPickerRender: ({
      field
    }: {
      field: ControllerRenderProps<Form, T>;
      // eslint-disable-next-line no-empty-pattern
    }) => React.ReactElement = ({ field: {} }) => {
      return (
        <Box pos="relative">
          <Flex>
            <Input
              placeholder={'選択してください'}
              {...register('selectBox')}
              h="48px"
              borderRadius="6px"
              _focus={{
                borderColor: 'gray.400'
              }}
              _focusVisible={{
                borderColor: 'gray.400',
                boxShadow: 'none'
              }}
              bgColor="gray.100"
              p="10px 16px"
              fontSize="18px"
              lineHeight="28px"
              border="1px solid"
              borderColor="gray.400"
              value=""
              isReadOnly={true}
              _invalid={{
                bgColor: '#FCE5E3',
                borderColor: '#EB1607'
              }}
            />
            <Flex pos="absolute" top="11px" left="16px" w="472px" overflowX="auto">
              <Box fontSize="18px" lineHeight="28px" zIndex={9}>
                <Flex alignItems="center" gap="5px">
                  {checkedMakers?.map((item) => (
                    <Center
                      key={item.id}
                      h="28px"
                      p="6px 6px 6px 10px"
                      bgColor="white"
                      borderRadius="100px">
                      <Text
                        color="gray.700"
                        fontSize="18px"
                        width="fit-content"
                        whiteSpace="nowrap">
                        {item.name}
                      </Text>
                      <Center
                        borderRadius="50%"
                        w="16px"
                        h="16px"
                        bgColor="gray.200"
                        ml="4px"
                        cursor={'pointer'}>
                        {/* onClick={() => !readOnly && deleteMaker(item.id)} */}
                        <Box w="10px" h="10px" bg="red" />
                      </Center>
                    </Center>
                  ))}
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Box>
      );
    };
    return dataPickerRender;
  }, []);
  return (
    <>
      <Flex>
        <Flex alignItems="center">
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
        </Flex>
        <Box>
          <InputGroup>
            <FormControl>
              <Controller
                control={control}
                name="selectBox"
                render={createSelectMenu<FieldName>('selectBox')}></Controller>
            </FormControl>
          </InputGroup>
        </Box>
      </Flex>
    </>
  );
};
export default memo(TestSelectBox);
