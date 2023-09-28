import React, { memo, useState, useEffect } from 'react';
import { FC, ReactNode } from 'react';
import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
interface IPorps {
  children?: ReactNode;
}

//泛型约束
const NavBar: FC<IPorps> = (props) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const locationUrl = useLocation();
  useEffect(() => {
    // navigate("/",{
    //   state:{
    //     id:""
    //   }
    // })
    switch (locationUrl.pathname) {
      case '/discover/recommend':
        setTabIndex(0);
        break;
      case '/discover/ranking':
        setTabIndex(1);
        break;
      case '/discover/songs':
        setTabIndex(2);
        break;
      case '/discover/djradio':
        setTabIndex(3);
        break;
      case '/discover/artist':
        setTabIndex(4);
        break;
      case '/discover/album':
        setTabIndex(5);
        break;
      default:
        setTabIndex(0);
    }
  }, [locationUrl.pathname]);
  return (
    <>
      <Tabs isManual variant="enclosed" index={tabIndex}>
        <TabList>
          <Link to="/discover/recommend">
            <Tab fontSize="12px">推荐</Tab>
          </Link>
          <Link to="/discover/ranking">
            <Tab fontSize="12px">排行榜</Tab>
          </Link>
          <Link to="/discover/songs">
            <Tab fontSize="12px">歌单</Tab>
          </Link>
          <Link to="/discover/djradio">
            <Tab fontSize="12px">主播电台</Tab>
          </Link>
          <Link to="/discover/artist">
            <Tab fontSize="12px">歌手</Tab>
          </Link>
          <Link to="/discover/album">
            <Tab fontSize="12px">新碟上架</Tab>
          </Link>
        </TabList>
      </Tabs>
    </>
  );
};
export default memo(NavBar);
