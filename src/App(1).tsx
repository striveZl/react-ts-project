import { useRoutes } from 'react-router-dom';
import routes from './router';
import React, { Suspense } from 'react';
import { useAppSelector } from './store';
import { Button } from '@chakra-ui/react';
import { changeMessageAction } from './store/modules/counter';
import { shallowEqual, useDispatch } from 'react-redux';
import AppHeard from './components/app-heard';
import AppFooter from './components/app-footer';
// import store from "./store";
// type GetStateFnType =typeof store.getState//获取函数的类型
// type FnReturnType = ReturnType<GetStateFnType>//获取函数返回值的类型
function App() {
  const { message } = useAppSelector(
    (state) => ({
      count: state.counter.count,
      message: state.counter.message
    }),
    shallowEqual
  );
  const dispacth = useDispatch();
  const changeClick = () => {
    dispacth(changeMessageAction('哈哈哈！'));
  };
  //Suspense 里面可以传组件或者字符串(路由的懒加载需要用到)
  return (
    <>
      <AppHeard />
      {/* <h2>当前计数:{count}</h2> */}
      <Suspense fallback="loading...">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />
      <br />
      {message}
      <Button onClick={changeClick}>点击一下</Button>
    </>
  );
}

export default App;
