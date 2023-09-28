import React, { memo, useEffect, useState } from 'react';
import { FC, ReactNode } from 'react';
import {
  Tab,
  Tabs,
  TabIndicator,
  TabList,
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Link as LinkTest
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HeaderWapper } from './style';
import { SearchIcon } from '@chakra-ui/icons';
import { useAppSelector } from '@/store';
import { shallowEqual } from 'react-redux';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const AppHeader: FC<IPorps> = (props) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const locationUrl = useLocation();
  const navigate = useNavigate();
  const {touristToken} = useAppSelector((state)=>({
    touristToken:state.setuser.touristToken
  }),
  shallowEqual
  )
  useEffect(() => {
    switch (locationUrl.pathname) {
      case '/discover/recommend':
        setTabIndex(0);
        break;
      case '/mine':
        setTabIndex(1);
        break;
      case '/focus':
        setTabIndex(2);
        break;
      case '/download':
        setTabIndex(3);
        break;
      default:
        setTabIndex(0);
    }
  }, [locationUrl.pathname]);

  const goDownload = () => {
    navigate('/download', {
      state: {
        name: '传递的数据！'
      }
    });
  };
  const loginOut=()=>{
    console.log("退出登陆！")
  }
  return (
    <HeaderWapper>
      <Flex>
        <Box className="content wrap-v1">
          <Tabs position="relative" variant="unstyled" index={tabIndex}>
            <TabList>
              <Link to="/discover">
                <Tab>发现音乐</Tab>
              </Link>
              <Link to="/mine">
                {' '}
                <Tab>我的音乐</Tab>
              </Link>
              <Link to="/focus">
                <Tab>关注</Tab>
              </Link>
              {/* <Link to="/download">
                <Tab>下载客户端</Tab>
              </Link> */}
              <LinkTest onClick={goDownload}>
                <Tab>下载客户端</Tab>
              </LinkTest>
            </TabList>
            <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
          </Tabs>
        </Box>
        <Box className="content" w="800px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input htmlSize={30} width="auto" borderRadius="20px"></Input>
            <Text lineHeight="40px" textAlign="center">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;创作者中心&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </Text> 
            {touristToken?<Text onClick={loginOut} cursor="pointer" lineHeight="40px">退出登陆</Text>:<Link to="/login"><Text lineHeight="40px">登陆</Text></Link>}
          </InputGroup>
        </Box>
      </Flex>
    </HeaderWapper>
  );
};
export default memo(AppHeader);
