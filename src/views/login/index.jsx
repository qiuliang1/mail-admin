import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Checkbox, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { getCookie, setCookie } from "@/utils/cookie";
import { useUser } from "@/store/user";
import { AesEncryption } from "@/utils/cipher";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import LogoImg from "@/assets/images/logo.png";
import LoginImg from "@/assets/images/login-icon.png";
import "./index.less";

function Login() {
  const [guid, setGuid] = useState("");
  const [rememberCheck, setRememberCheck] = useState(false);
  const [form] = Form.useForm();
    const navigate = useNavigate();

  const loginTo = useUser((state) => state.login);
  /**
   * @description 点击登陆触发事件
   * @param {*} values FormData
   */
  const onFinish = async (loginParam) => {
    const data = await loginTo({ ...loginParam, guid, from: 'pc' });
    console.log("[ data1111 ] >", data);
    if (data?.code) {
      setUserState(loginParam);
      navigate('/')
    }
  };

  useEffect((_) => {
    init();
    getUniqueCode();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUserState = (loginParam) => {
    const encryption = new AesEncryption();
    console.log('[ remember ] >', rememberCheck)
    setCookie(
      "ac",
      rememberCheck ? encryption.encryptByAES(loginParam.userName) : "", 3*86400
    );
    setCookie("pw", rememberCheck ? encryption.encryptByAES(loginParam.passwd) : "", 3*86400);
  };

  const getUniqueCode = () => {
    FingerprintJS.load().then((fp) => {
      fp.get().then((result) => {
        const visitorId = result.visitorId;
        setGuid(visitorId);
        console.log("获取设备唯一标识：", visitorId);
      });
    });
  };

  const checked = () => {
    setRememberCheck(!rememberCheck);
  };

  const init = () => {
    const account = getCookie("ac");
    if (account) {
      const encryption = new AesEncryption();
      const userName = encryption.decryptByAES(account);
      const passwd = encryption.decryptByAES(getCookie("pw"));
      form.setFieldsValue({
        userName,
        passwd,
      });
      //   setAccount(userName);
      setRememberCheck(true);
    }
  };

  return (
    <div className="qg-login relative w-full h-full px-4">
      <div className="container relative h-full py-2 mx-auto sm:px-10">
        <div className="flex h-full">
          <div className="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
            <div className="anticon qg-app-logo -enter-x">
              <img src={LogoImg} alt="" />{" "}
              <span className="ml-2 truncate md:opacity-100 vben-app-logo__title xs:opacity-0">
                Yun Chuang
              </span>
            </div>
            <div className="my-auto">
              <img
                className="w-8/12 -mt-16 -enter-x"
                src={LoginImg}
                alt="Yun Chung"
              />
              <div className="mt-5 font-medium text-white -enter-x">
                <span className="inline-block mt-4 text-3xl">
                  云创商城后台管理系统
                </span>
              </div>
              <div className="mt-5 font-normal text-white dark:text-gray-500 -enter-x">
                输入您的用户密码开始使用！
              </div>
            </div>
          </div>
          <div className="flex w-full h-full py-5 mb-1 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
            <div className="qg-login-form relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-2/4 xl:pb-16 enter-x">
              <h2 className="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left enter-x">
                登陆
              </h2>
              <Form form={form} name="login" onFinish={onFinish}>
                <Form.Item
                  name="userName"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item
                  name="passwd"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
                <Form.Item className="leading-loose">
                  <Form.Item name="remember" noStyle>
                    <Checkbox
                      checked={rememberCheck}
                      className="align-middle"
                      onChange={checked}
                    >
                      记住我
                    </Checkbox>
                  </Form.Item>
                  <Button type="link" className="float-right p-0">
                    忘记密码？
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                  >
                    登陆
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
