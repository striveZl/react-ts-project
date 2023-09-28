import React, { lazy } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Navigate, RouteObject } from "react-router-dom"
// import Discover from "@/views/discover"
// import Mine from "@/views/mine"
// import Focus from "@/views/focus"
// import Download from "@/views/download"
import { Navigate, RouteObject } from 'react-router-dom';
import NeedAuth from './needAuth';
const Discover = lazy(() => import('@/views/discover'));
const Mine = lazy(() => import('@/views/mine'));
const Focus = lazy(() => import('@/views/focus'));
const Download = lazy(() => import('@/views/download'));
const Recommend = lazy(() => import('@/views/discover/c-views/recommend'));
const Ranking = lazy(() => import('@/views/discover/c-views/ranking'));
const Songs = lazy(() => import('@/views/discover/c-views/songs'));
const Djradio = lazy(() => import('@/views/discover/c-views/djradio'));
const Album = lazy(() => import('@/views/discover/c-views/album'));
const Artist = lazy(() => import('@/views/discover/c-views/artist'));
const SetUser = lazy(() => import('@/views/setuser/index'));
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="discover" />
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend" />
      },
      {
        path: '/discover/recommend',
        element: <Recommend />
      },
      {
        path: '/discover/ranking',
        element: <Ranking />
      },
      {
        path: '/discover/songs',
        element: <Songs />
      },
      {
        path: '/discover/djradio',
        element: <Djradio />
      },
      {
        path: '/discover/album',
        element: <Album />
      },
      {
        path: '/discover/artist',
        element: <Artist />
      }
    ]
  },
  {
    path: '/mine',
    element: <Mine />
  },
  {
    path: '/focus',
    element: <Focus />
  },
  {
    path: '/download',
    element: <Download />
  },
  {
    path: '/login',
    element: <NeedAuth><SetUser /></NeedAuth>
  }
];
export default routes;
