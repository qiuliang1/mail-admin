// import logo from './logo.svg';
import Router from "./router";
import { useRecoilValue } from "recoil";
import { getSettingValue } from "@/store/setting.recoil";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "./styles/antd-reset.less"

function App() {
  // const themeColor = useRecoilValue(getSettingValue('themeColor'))
  // console.log('1111', themeColor)
  return (
    <ConfigProvider locale={zhCN} theme={{
      token: {
        colorPrimary: useRecoilValue(getSettingValue('themeColor')),
      },
    }}>
      <Router />
    </ConfigProvider>
  );
}

export default App;
