import React, { useState, useContext, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Breadcrumb, theme, Menu, Avatar } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import menuList from "@/router/menuConfig";
import Setting from "./setting";
import { useRecoilState } from "recoil";
import { projectSetting } from "@/store/setting.recoil";
import {GetSettingFn} from "@/utils/recoil-get"
import MenuTypeContext from "../context";
import LogoImg from "@/assets/images/logo.png";

function AsideRender() {
  const [drawshow, setDrawshow] = useState(false);
  const { menuType, headColor, menuWidth } = useContext(MenuTypeContext);
  const [proSetting, setProSetting] = useRecoilState(projectSetting);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const menuType = useRecoilValue(getSettingValue("menuSetting.type"));

  useEffect(() => {
  }, [headColor]);

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

  const handleMenuSelect = (menu) => {
    console.log("[ menu ] >", menu);
    navigate(menu.key);
  };

  const collapsedControl = () => {
    const collapsed = proSetting.menuSetting.collapsed
    const menuSetting = {...proSetting.menuSetting, collapsed: !collapsed}
    setProSetting({...proSetting, menuSetting})
  }

  return (
    <Layout.Header
      className={`!px-0 flex justify-between text-lg border-b qg-layout-header ${
        headColor === "#ffffff"
          ? "qg-layout-header--light"
          : "qg-layout-header--dark"
      }`}
    >
      <div className="flex">
        {menuType !== "sidebar" && (
          <div className="px-2 cursor-pointer qg-layout-header_item qg-logo-icon" style={{width: `${menuWidth}px`}}>
            <img src={LogoImg} alt="" /> Yun Chuang
          </div>
        )}
        {menuType !== "top-menu" && (
          <div className="qg-layout-header_item px-2 cursor-pointer" onClick={() => collapsedControl()}>
            {proSetting.menuSetting.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        )}
        {menuType !== "top-menu" && (
          <Breadcrumb className="mx-3 leading-[inherit]">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
        )}

        {menuType === "top-menu" && (
          <Menu
            mode="horizontal"
            theme="light"
            defaultSelectedKeys={[pathname]}
            onClick={handleMenuSelect}
            items={items(menuList)}
            style={{ background: "transparent" }}
          />
        )}
      </div>

      <div className="ql-tool flex">
        <span className="px-2 qg-layout-header_item cursor-pointer">
          <BellOutlined />
        </span>
        <div className="px-2 qg-layout-header_item cursor-pointer leading-[44px]">
          <Avatar size="small">Tom</Avatar>
          <span className="ml-2 text-sm">userName</span>
        </div>
        <span
          className="px-2 qg-layout-header_item cursor-pointer"
          onClick={() => setDrawshow(true)}
        >
          <SettingOutlined />
        </span>
      </div>
      <Setting show={drawshow} onClose={() => setDrawshow(false)} />
    </Layout.Header>
  );
}

export default AsideRender;
