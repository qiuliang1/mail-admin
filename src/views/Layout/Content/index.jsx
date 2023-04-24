import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Layout } from "antd";
import NotFount from "@/views/404";
import { useSystem } from "@/store/system";
// import menuList from "@/router/menuConfig";
import routeList from "@/config/routeMap";
import { getMenuItemInMenuListByProperty } from "@/utils";

const getPageTitle = (menuList, pathname) => {
  let title = "云创商城后台管理系统";
  let item = getMenuItemInMenuListByProperty(menuList, "path", pathname);
  if (item) {
    title = `${item.name}`;
  }
  return title;
};

function Content() {
  const location = useLocation();
  const menuList = useSystem((state) => state.menuList);
  const { pathname } = location;
  // const handleFilter = (route) => {
  //   // 过滤没有权限的页面
  //   return true;
  //   // return role === "admin" || !route.roles || route.roles.includes(role);
  // };
  console.log("[ route ] >", routeList);
  return (
    <DocumentTitle title={getPageTitle(menuList, pathname)}>
      <Layout.Content className="m-4">
        <TransitionGroup className="w-full h-full">
          <CSSTransition
            key={pathname}
            timeout={500}
            classNames="fade"
            exit={false}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              {routeList.map((route) => {
                return (
                  <Route
                    element={<route.component />}
                    key={route.path}
                    path={route.path}
                  />
                );
              })}
              <Route path="*" element={<NotFount />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Layout.Content>
    </DocumentTitle>
  );
}

export default Content;
