import React from "react";
import { Layout, useState } from "antd";
import AsideRender from "./Aside";
import ContentRender from "./Content";
import HeaderRender from "./Header";
import { useRecoilValue } from "recoil";
import { getSettingValues } from "@/store/setting.recoil";
import MenuTypeContext from "./context";
import "./index.less";

const Layout1 = () => {
  return (
    <Layout>
      <AsideRender />
      <Layout>
        <HeaderRender />
        <ContentRender />
      </Layout>
    </Layout>
  );
};

const Layout2 = () => {
  return (
    <Layout>
      <HeaderRender />
      <Layout>
        <AsideRender />
        <ContentRender />
      </Layout>
    </Layout>
  );
};

const Layout3 = () => {
  return (
    <Layout>
      <HeaderRender />
      <Layout>
        <ContentRender />
      </Layout>
    </Layout>
  );
};

const LayoutRender = () => {
  const [menuType, menuColor, headColor, menuWidth] = useRecoilValue(
    getSettingValues([
      "menuSetting.type",
      "menuSetting.bgColor",
      "headerSetting.bgColor",
      "menuSetting.menuWidth"
    ])
  );
  document.documentElement.style.setProperty("--header-bg-color", headColor);
  document.documentElement.style.setProperty("--sidebar-bg-color", menuColor);
  const providerProp = {
    menuType,
    menuColor,
    headColor,
    menuWidth
  };

  const layoutState = [
    { type: "sidebar", dom: Layout1 },
    { type: "mix", dom: Layout2 },
    { type: "top-menu", dom: Layout3 },
  ];
  const Lay =
    layoutState.find((v) => v.type === menuType)?.dom ?? layoutState[0].dom;
  return (
    <MenuTypeContext.Provider value={providerProp}>
      <Lay />
    </MenuTypeContext.Provider>
  );
};
export default LayoutRender;
