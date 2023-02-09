import { Layout, theme } from "antd";
import React from "react";
import AsideRender from "./Aside";
import ContentRender from "./Content";
import HeaderRender from "./Header";
import "./index.less"

const LayoutRender = () => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  return (
    <Layout>
      <AsideRender />

      <Layout
        style={{
          background: colorBgLayout
        }}
      >
        {/* <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
          />
        </Header> */}
        <HeaderRender />
        <ContentRender />
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default LayoutRender;
