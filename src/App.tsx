import { Link, useRoutes } from "react-router-dom";
import routes from "./router";
import React,{Suspense} from "react";
import { useAppSelector } from "./store";
import {Tab, Tabs,TabIndicator,TabList, Button} from "@chakra-ui/react";
import { changeMessageAction } from "./store/modules/counter";
import { shallowEqual, useDispatch } from "react-redux";
// import store from "./store";
// type GetStateFnType =typeof store.getState//获取函数的类型
// type FnReturnType = ReturnType<GetStateFnType>//获取函数返回值的类型
function App() {
  const {message} = useAppSelector((state)=>({
      count:state.counter.count,
      message:state.counter.message
  }),
    shallowEqual
  )
  const dispacth = useDispatch()
  const changeClick = ()=>{
    dispacth(changeMessageAction('哈哈哈！'))
  }
  //Suspense 里面可以传组件或者字符串(路由的懒加载需要用到)
  return (
    <>
    {message}
    <Button onClick={changeClick}>点击一下</Button>
      <div className="nav">
        <Tabs position="relative" variant="unstyled">
          <TabList>
            <Link to="/discover"><Tab>发现音乐</Tab></Link>
            <Link to="/mine"> <Tab>我的音乐</Tab></Link>
            <Link to="/focus"><Tab>关注</Tab></Link>
            <Link to="/download"><Tab>下载客户端</Tab></Link>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue.500"
            borderRadius="1px"
          />
        </Tabs>
        
      </div>
      {/* <h2>当前计数:{count}</h2> */}
      <Suspense fallback="loading...">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      
    </>
  )
}

export default App;
