import React from "react";
import { Layout } from "antd";
import AsideRender from "./Aside";
import ContentRender from "./Content";
import HeaderRender from "./Header";
import { shallow } from "zustand/shallow";
import { useSystem } from "@/store/system";
import MenuTypeContext from "./context";
import "./index.less";

const LayoutRender = () => {
  const [menuType, menuColor, headColor, menuWidth] = useSystem(
    (state) => [
      state.menuSetting.type,
      state.menuSetting.bgColor,
      state.headerSetting.bgColor,
      state.menuSetting.menuWidth,
    ],
    shallow
  );
  document.documentElement.style.setProperty("--header-bg-color", headColor);
  document.documentElement.style.setProperty("--sidebar-bg-color", menuColor);
  const providerProp = {
    menuType,
    menuColor,
    headColor,
    menuWidth,
  };

  return (
    <MenuTypeContext.Provider value={providerProp}>
      <Layout>
        {menuType === "sidebar" && <AsideRender />}
        {menuType !== "sidebar" && <HeaderRender />}
        <Layout>
          {menuType === "mix" && <AsideRender />}
          {menuType === "sidebar" && <HeaderRender />}
          <ContentRender />
        </Layout>
      </Layout>
    </MenuTypeContext.Provider>
  );
};
export default LayoutRender;
