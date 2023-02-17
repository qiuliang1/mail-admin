import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import menuList from "@/router/menuConfig";
import { Layout, Menu, theme } from "antd";
import MenuTypeContext from "../context";
import {GetSettingFn} from "@/utils/recoil-get"
import LogoImg from "@/assets/images/logo.png";

function AsideRender() {
  const [menuExpend, setMenuExpend] = useState([]);
  const {
    token: { boxShadowTabsOverflowTop },
  } = theme.useToken();
  const { menuType, menuColor, menuWidth } = useContext(MenuTypeContext);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     getExpend(menuList)
  //   }, [])

  const items = (menuList) => {
    if (menuList && menuList.length) {
      return menuList.map((menu) => {
        return {
          key: menu.path,
          icon: "",
          label: menu.title,
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
        list.map((menu) => {
          if (pathname.includes(menu.path)) {
            menuEx = [...menuEx, menu.path];
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
    <Layout.Sider className="qg-layout-sidebar" collapsed={GetSettingFn("menuSetting.collapsed")} width={menuWidth}>
      {menuType === "sidebar" && (
        <div className={`qg-logo-icon ${menuColor === "#ffffff" ? "" : "qg-logo-icon-dark"}`}>
          <img src={LogoImg} alt="" /> {GetSettingFn("menuSetting.collapsed") ? "" : "Yun Chuang"}
        </div>
      )}
      <Menu
        mode="inline"
        theme={menuColor === "#ffffff" ? "light" : "dark"}
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={getExpend(menuList)}
        onClick={handleMenuSelect}
        items={items(menuList)}
      />
    </Layout.Sider>
  );
}

export default AsideRender;
