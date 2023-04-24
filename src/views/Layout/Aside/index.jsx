import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import MenuTypeContext from "../context";
import { useSystem } from "@/store/system";
import { userTree, authTree } from "@/api/ums";
import { getCookie } from "@/utils/cookie"
import LogoImg from "@/assets/images/logo.png";

function AsideRender() {
  const { menuType, menuColor, menuWidth } = useContext(MenuTypeContext);

  const { pathname } = useLocation();
  console.log("[ pathname ] >", pathname);
  const pathName = pathname === "/" ? "/dashboard" : pathname;
  const navigate = useNavigate();

  const {menuSetting:{collapsed}, menuList} = useSystem((state) => state);
  const setMenuList = useSystem(state => state.setMenuList)

  useEffect(() => {
    // getExpend(menuList)
    getMenuList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getToken = () => {
    const token = localStorage.getItem("authToken") // getCookie("authToken");
    return token
  }

  const getMenuList = async () => {
    if(!getToken()) {
      navigate('login')
      return
    }
    const { data: userTre } = await userTree({sysType: ""});
    console.log('[ userTre ] >', userTre)
    const { data } = await authTree({sysType: ""});
    const menus = await setFilterMenu(data);
    setMenuList(menus)
  };

  const setFilterMenu = async (list) => {
    const listMenu = list[0].children;
    const deepFilter = (listMe) => {
      if (Array.isArray(listMe)) {
        return listMe.filter((v) => {
          v.children = deepFilter(v.children);
          return v.type === 'Function';
        });
      }
    };
    return deepFilter(listMenu);
  };

  const items = (menuList) => {
    if (menuList && menuList.length) {
      return menuList.map((menu) => {
        return {
          key: menu.path,
          icon: menu.icon,
          label: menu.name,
          path: menu.path,
          children: items(menu.children),
        };
      });
    } else {
      return undefined;
    }
  };
  const getExpend = (menulist) => {
    let menuEx = [];
    function node(list) {
      if (list && list.length) {
        list.forEach((menu) => {
          if (pathname.includes(menu?.path)) {
            menuEx = [...menuEx, menu?.path];
          }
          node(menu.children);
        });
      } else {
        return undefined;
      }
    }
    node(menulist);
    // setMenuExpend(menuEx)
    return menuEx;
  };

  const handleMenuSelect = (menu) => {
    navigate(menu.key);
  };

  return (
    <Layout.Sider
      className="qg-layout-sidebar"
      collapsed={collapsed}
      width={menuWidth}
    >
      {menuType === "sidebar" && (
        <div
          className={`qg-logo-icon ${
            menuColor === "#ffffff" ? "" : "qg-logo-icon-dark"
          }`}
        >
          <img src={LogoImg} alt="" /> {collapsed ? "" : "Yun Chuang"}
        </div>
      )}
      <Menu
        mode="inline"
        theme={menuColor === "#ffffff" ? "light" : "dark"}
        defaultSelectedKeys={[pathName]}
        defaultOpenKeys={getExpend(menuList)}
        onClick={handleMenuSelect}
        items={items(menuList)}
      />
    </Layout.Sider>
  );
}

export default AsideRender;
