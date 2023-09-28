import React, { memo } from 'react';
import { FC, ReactNode } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, TabIndicator } from '@chakra-ui/react';
import TouristLogin from './tourist-login';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const Login: FC<IPorps> = (props) => {
  return (
    <>
      <Tabs w="600px" position="relative" variant="unstyled">
        <TabList>
          <Tab marginLeft="40px">手机号登陆</Tab>
          <Tab marginLeft="40px">二维码登陆</Tab>
          <Tab marginLeft="40px">游客登陆</Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
        <TabPanels>
          <TabPanel>
            <p>手机</p>
          </TabPanel>
          <TabPanel>
            <p>二维码</p>
          </TabPanel>
          <TabPanel>
            <TouristLogin/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
export default memo(Login);
