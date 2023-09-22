import { Link, useRoutes } from "react-router-dom";
import routes from "./router";
import React,{Suspense} from "react";
import { useAppSelector } from "./store";
// import store from "./store";
// type GetStateFnType =typeof store.getState//获取函数的类型
// type FnReturnType = ReturnType<GetStateFnType>//获取函数返回值的类型
function App() {
  const {count,message} = useAppSelector((state)=>({
      count:state.counter.count,
      message:state.counter.message
  }))

  //Suspense 里面可以传组件或者字符串(路由的懒加载需要用到)
  return (
    <>
      <div className="nav">
        <Link to="/discover">发现音乐</Link>&nbsp;&nbsp;
        <Link to="/mine">我的音乐</Link>&nbsp;&nbsp;
        <Link to="/focus">关注</Link>&nbsp;&nbsp;
        <Link to="/download">下载客户端</Link>&nbsp;&nbsp;
      </div>
      <h2>当前计数:{count}</h2>
      <Suspense fallback="loading...">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      
    </>
  )
}

export default App;
