import React, { useEffect } from "react";
import { Button, Dropdown, Space } from "antd";
// import COS from "cos-js-sdk-v5";
import UTF8 from "crypto-js/enc-utf8";
import Base64 from "crypto-js/enc-base64";
import { initCloud } from "@wxcloud/cloud-sdk";
// import Cloud from "wx-server-sdk"
import { AesEncryption } from "../../utils/cipher";

function DashboardRender() {
  // 存储桶名称，由 bucketname-appid 组成，appid 必须填入，可以在 COS 控制台查看存储桶名称。 https://console.cloud.tencent.com/cos5/bucket
  // const Bucket = "7072-prod-2ghma30942c1b4f9-1305745455"; /* 存储桶，必须字段 */

  // 存储桶 region 可以在 COS 控制台指定存储桶的概览页查看 https://console.cloud.tencent.com/cos5/bucket/
  // 关于地域的详情见 https://cloud.tencent.com/document/product/436/6224
  // const Region = "ap-shanghai"; /* 存储桶所在地域，必须字段 */

  // const [cloud, setCloud] = useState(null);
  const items = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];
  // function upload() {
  //   var cos = new COS({
  //     SecretId: "AKIDmSeiYAYvGPMH6ze4GG4lHahU7XjhU4b4",
  //     SecretKey: "MVRAi3B6pNhw1xiGhz60hDZmmaAYjkZC",

  //     // getAuthorization 必选参数
  //     //   getAuthorization: function (options, callback) {
  //     //     // 初始化时不会调用，只有调用 cos 方法（例如 cos.putObject）时才会进入
  //     //     // 异步获取临时密钥
  //     //     // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
  //     //     // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
  //     //     // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048

  //     //     var url = "/fx/sys/msg?guid=342421&userName=admin&passwd=MTIzNDU2"; // url 替换成您自己的后端服务
  //     //     var xhr = new XMLHttpRequest();
  //     //     xhr.open("GET", url, true);
  //     //     xhr.onload = function (e) {
  //     //         console.log('[ e ] >', e)
  //     //       try {
  //     //         var data = JSON.parse(e.target.responseText);
  //     //         var credentials = data.data;
  //     //       } catch (e) {}
  //     //       console.log('[ e ] >', data)
  //     //       if (!data || !credentials) {
  //     //         return console.error(
  //     //           "credentials invalid:\n" + JSON.stringify(data, null, 2)
  //     //         );
  //     //       }
  //     //       callback({
  //     //         TmpSecretId: credentials.tmpSecretId,
  //     //         TmpSecretKey: credentials.tmpSecretKey,
  //     //         SecurityToken: credentials.sessionToken,
  //     //         // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
  //     //         StartTime: data.startTime ?? "1677051982", // 时间戳，单位秒，如：1580000000
  //     //         ExpiredTime: data.expiredTime ?? "1677062558", // 时间戳，单位秒，如：1580000000
  //     //       });
  //     //     };
  //     //     xhr.send();
  //     //   },
  //   });
  //   return cos;
  // }

  // const uploads = (e) => {
  //   const file = e.target.files && e.target.files[0];
  //   /* 直接调用 cos sdk 的方法 */
  //   // upload().uploadFile({
  //   //   Bucket /* 填写自己的 bucket，必须字段 */,
  //   //   Region /* 存储桶所在地域，必须字段 */,
  //   //   Key: "2.jpg" /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
  //   //   Body: file, // 上传文件对象
  //   //   SliceSize:
  //   //     1024 *
  //   //     1024 *
  //   //     5 /* 触发分块上传的阈值，超过5MB 使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */,
  //   // });
  //   // cloud.uploadFile({
  //   //   cloudPath: "example.png", // 对象存储路径，根路径直接填文件名，文件夹例子 test/文件名，不要 / 开头
  //   //   file: file, // 通过 input 或者 new File 获取
  //   //   success: (res) => {
  //   //     console.log(res.fileID);
  //   //   },
  //   //   fail: (err) => {
  //   //     console.error(err);
  //   //   },
  //   // });
  // };

  const test = () => {
    const encrypt = new AesEncryption();
    console.log(
      '[ encrypt("123456") ] >',
      UTF8.parse("123456").toString(Base64)
    );
    // 9aba2f2ecb9a3508e3c0c70346e91e0d
    console.log(
      '[ encrypt("9aba2f2ecb9a3508e3c0c70346e91e0d") ] >',
      encrypt.encryptByAES("123456")
    );
    console.log(
      '[ encrypt("9aba2f2ecb9a3508e3c0c70346e91e0d") ] >',
      encrypt.decryptByAES("mrovLsuaNQjjwMcDRukeDQ==")
    );
  };
  const initClouds = () => {
    const cloudInit = initCloud();
    const c = new cloudInit.Cloud({
      resourceAppid: "wx7aadc890f64772d6",
      resourceEnv: "prod-6g13xb80ede93f63", // 资源方云环境 ID
      identityless: true,
    });
    console.log("[ cloudInit ] >", c);
    c.init();
    // setCloud(c);
    // c.getTempFileURL({
    //     fileList: [{
    //       fileID: 'cloud://prod-6g13xb80ede93f63.7072-prod-6g13xb80ede93f63-1305745455/yunchuang/63f5cce12bda2061c3743966.png', // 对象存储文件 ID 列表，最多50个，从上传文件接口或者控制台获取
    //       maxAge: 86400 , // 有效期时长，单位秒，默认86400
    //     }]
    //   }).then(res => {
    //     console.log(res.fileList)
    //   }).catch(error => {
    //     console.error(error)
    //   })
    //     const cloud = require('wx-server-sdk')
    // cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
    // exports.main = async (event, context) => {
    //   return await cloud.openapi.security.msgSecCheck-v1({ content:"安全检查测试文本" })
    // }
  };
  useEffect(() => {
    test();
    initClouds();
  }, []);
  return (
    <div>
      <Button type="primary">Dashboard</Button>
      {/* <input id="fileSelector" type="file" onChange={uploads} /> */}

      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()} href="n">
          <Space>
            Click me
          </Space>
            {/* <DownOutlined /> */}
        </a>
      </Dropdown>
    </div>
  );
}

export default DashboardRender;
