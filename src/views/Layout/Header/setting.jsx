import React from "react";
import { Drawer, Divider, Switch, InputNumber } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import {
  MENU_TYPE,
  SETTING_COLOR,
  TOP_COLOR,
  SIDEBAR_COLOR,
} from "@/config/drawSetting";
import { useSystem } from "@/store/system";

const Setting = (props) => {
//   const { menuSetting, headerSetting } = proSetting;
 
  const menuMode = useSystem(state => state.setSystemProperty)
  const menuSetting = useSystem(state => state.menuSetting)
  const headerSetting = useSystem(state => state.headerSetting)
  const themeColor = useSystem(state => state.themeColor)
  console.log('[ menuSetting ] >', menuSetting)

  return (
    <Drawer
      title="项目配置"
      placement="right"
      onClose={props.onClose}
      open={props.show}
    >
      <Divider>布局</Divider>
      <div className="flex justify-around">
        {MENU_TYPE.map((v) => (
          <div
            key={v}
            className={`setting-menu__item setting-menu__item-${v} ${
              v === menuSetting.type ? "setting-menu__item-active" : ""
            }`}
            onClick={() => menuMode("menuSetting.type", v)}
          >
            <div className="mix-sidebar"></div>
          </div>
        ))}
      </div>
      <Divider>系统主题</Divider>
      <div className="flex justify-around">
        {SETTING_COLOR.map((v) => (
          <span
            key={v}
            className={`setting-color__item`}
            style={{ background: v }}
            onClick={() => menuMode("themeColor", v)}
          >
            {themeColor === v && <CheckOutlined />}
          </span>
        ))}
      </div>
      <Divider>顶栏主题</Divider>
      <div className="flex justify-around">
        {TOP_COLOR.map((v) => (
          <span
            key={v}
            className={`setting-color__item border border-solid ${
              headerSetting.bgColor === v
                ? "border-[#0b79ee]"
                : "border-gray-300"
            }`}
            style={{ background: v }}
            onClick={() => menuMode("headerSetting.bgColor", v)}
          >
            {headerSetting.bgColor === v && <CheckOutlined />}
          </span>
        ))}
      </div>
      <Divider>菜单主题</Divider>
      <div className="flex justify-around">
        {SIDEBAR_COLOR.map((v) => (
          <span
            key={v}
            className={`setting-color__item border border-solid ${
              menuSetting.bgColor === v ? "border-[#0b79ee]" : "border-gray-300"
            }`}
            style={{ background: v }}
            onClick={() => menuMode("menuSetting.bgColor", v)}
          >
            {menuSetting.bgColor === v && <CheckOutlined />}
          </span>
        ))}
      </div>
      <Divider>界面功能</Divider>
      <div className="qg-setting-switch">
        <div className="qg-setting-switch-item flex justify-between mb-4">
          <span>折叠菜单</span>
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            defaultChecked={menuSetting.collapsed}
            onClick={() =>
              menuMode("menuSetting.collapsed", !menuSetting.collapsed)
            }
          />
        </div>
        <div className="qg-setting-switch-item flex justify-between mb-4">
          <span>菜单展开宽度</span>
          <InputNumber
            min={100}
            max={300}
            step={10}
            defaultValue={menuSetting.menuWidth}
            onChange={val =>
              menuMode("menuSetting.menuWidth", val)
            }
          />
        </div>
      </div>
    </Drawer>
  );
};

export default Setting;
