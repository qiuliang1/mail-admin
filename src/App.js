// import logo from './logo.svg';
import Router from "./router";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "./styles/antd-reset.less"

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </ConfigProvider>
  );
}

export default App;
