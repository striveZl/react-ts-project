import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import Login from './login';
import Register from './register';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const SetUser: FC<IPorps> = (props) => {
  return (
    <>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>登陆</Tab>
          <Tab>注册</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Register />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
export default memo(SetUser);
