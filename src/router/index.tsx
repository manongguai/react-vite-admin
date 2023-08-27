/* 
路由：旧版组件形式写法
*/
/* 
import App from "@/App";
import About from "@/views/About";
import Home from "@/views/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const baseRoute = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Navigate to="/home" />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default baseRoute; */

/* 
  新版： 配置形式写法

  报错：react-dom.development.js:86 Warning: Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.

  懒加载需要添加一个loading组件
*/
// import App from "@/App";
import { Navigate, useRoutes } from 'react-router-dom'
import { lazy } from 'react'
import lazyLoad from '@/router/lazyLoad'
import LayoutContainer from '@/layout'
import Login from '@/views/Login/index'
import { RouteObject } from './interface'
import NotFound from '@/views/NotFound'
import NotAuth from '@/views/NotAuth'
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutContainer />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" />
      },
      {
        path: '/home',
        meta: {
          requiredAuth: true,
          title: 'home'
        },
        element: lazyLoad(lazy(() => import('@/views/Home')))
      },
      {
        path: '/user/list',
        meta: {
          requiredAuth: true,
          title: 'userList'
        },
        element: lazyLoad(lazy(() => import('@/views/User/index')))
      },
      {
        path: '/user/detail',
        meta: {
          requiredAuth: true,
          title: 'userDetail'
        },
        element: lazyLoad(lazy(() => import('@/views/User/detail')))
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/404',
    element: <NotFound />
  },
  {
    path: '/403',
    element: <NotAuth />
  },
  {
    path: '*',
    element: <Navigate to="/404" />
  }
]
const BaseRouter = () => {
  const BaseRouter = useRoutes(routes)
  return BaseRouter
}
export default BaseRouter
