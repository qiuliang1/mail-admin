import React, {useState, useEffect} from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom"
import menuList from "@/router/menuConfig";
import { Layout, Menu, theme } from "antd";

function AsideRender() {
    const [menuExpend, setMenuExpend] = useState([])
  const {
    token: { boxShadowTabsOverflowTop, colorBgBase },
  } = theme.useToken();
  
  const {pathname} = useLocation()
  const navigate = useNavigate()
  console.log("[ theme.useToken() ] >", theme.useToken(), pathname);

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
    let menuEx = []
    function node(list) {
        if (list && list.length) {
            list.map((menu) => {
              if(pathname.includes(menu.path)) {
                  menuEx = [...menuEx, menu.path]
              }
              node(menu.children)
            });
          } else {
            return undefined; 
          }
    }
    node(menulist)
    // setMenuExpend(menuEx)
    return menuEx
  }

  const handleMenuSelect = (menu) => {
    console.log("[ menu ] >", menu);
    navigate(menu.key)
  };

  return (
    <Layout.Sider
      style={{
        background: boxShadowTabsOverflowTop
      }}
      width={200}
    >
      <div className="logo-icon">
        Logo
      </div>
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={getExpend(menuList)}
        onClick={handleMenuSelect}
        style={{
          background: "transparent",
          color: colorBgBase,
        }}
        items={items(menuList)}
      />
    </Layout.Sider>
  );
}

export default AsideRender;
