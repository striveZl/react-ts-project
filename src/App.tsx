import { useRoutes } from 'react-router-dom';
import routes from './router';
import { Suspense } from 'react';
import AppHeard from './components/app-heard';
import AppFooter from './components/app-footer';
import { Box } from '@chakra-ui/react';
import AppPlayerBar from './views/player/app-player-bar';
function App() {
  //Suspense 里面可以传组件或者字符串(路由的懒加载需要用到)
  return (
    <>
      <AppHeard />
      <Suspense fallback="loading...">
        <Box>{useRoutes(routes)}</Box>
      </Suspense>
      <AppFooter />

      {/* 播放器工具栏 */}
      <AppPlayerBar />
    </>
  );
}

export default App;
