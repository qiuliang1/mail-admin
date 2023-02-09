import React from "react";
import { MenuFoldOutlined } from "@ant-design/icons"
import { Layout, Breadcrumb, theme } from "antd";

function AsideRender() {
  const {
    token: { boxShadowTabsOverflowTop, colorBgBase },
  } = theme.useToken();

  return (
    <Layout.Header className="!pl-6 flex text-lg !bg-white border-b">
      <div className="logo">
        <MenuFoldOutlined />
      </div>
      <Breadcrumb className="mx-3 leading-[inherit]">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
    </Layout.Header>
  );
}

export default AsideRender;
