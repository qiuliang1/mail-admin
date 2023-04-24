import React, { useState } from "react";
import { Row, Col, Image, Form, Input, Button } from "antd";
import Table from "@/components/Table";
import { expInfoInsert, expInfoModify, expInfoList } from "@/api/ums";

const LogisticRender = () => {
  const [listProp, setListProp] = useState({
    expressCode: "",
    expressName: "",
  });
  const [tableList, setTableList] = useState([]);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "物流图标",
      dataIndex: "expressIcon",
      key: "expressIcon",
      align: "center",
      render: (src) => <Image width={56} src={src} alt="" />,
    },
    {
      title: "物流编号",
      dataIndex: "expressCode",
      key: "expressCode",
    },
    {
      title: "物流名称",
      dataIndex: "expressName",
      key: "expressName",
    },
    {
      title: "物流电话",
      dataIndex: "expressTel",
      key: "expressTel",
      //   render: (tel) => <a href={`tel:${tel}`}>{tel}</a>
    },
    {
      title: "创建时间",
      dataIndex: "createdTime",
      key: "createdTime",
    },
  ];
  const fetchList = async (current = 1, pageSize = 10) => {
    console.log("[ listProp ] >", listProp);
    const { data } = await expInfoList({ ...listProp, current, pageSize });
    const { total, records } = data;
    setTableList(records);
    setTotal(total);
  };

  const onFinish = async () => {
    try {
      const fieldsVal = form.getFieldsValue(true);
    //   console.log("[ fieldVal ] >", fieldsVal);
      // return
      const request = fieldsVal.id ? expInfoModify : expInfoInsert;
      const { data } = await request(fieldsVal);
      if (data) {
        fetchList();
      }
    } catch (error) {
      console.log("Failed:", error);
    }
  };

  const btnClick = (p, isEdit) => {
    console.log("[ p ] >", p);
    switch (isEdit) {
      case "add":
        // setProduceId(null);
        form.resetFields();
        // setOpen(true);
        break;
      case "edit":
        form.setFieldsValue(p);
        break;
      default:
        break;
    }
  };

  return (
    <Row gutter={{ md: 8, lg: 8 }} className="h-full">
      <Col span={15} className="h-full">
        <div className="bg-white mb-2 p-2">
          <Form layout="inline">
            <Form.Item name="expressName" label="物流名称">
              <Input
                value={listProp.expressName}
                placeholder="请输入产品名称"
                onBlur={(e) =>
                  setListProp({ ...listProp, expressName: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item name="expressCode" label="物流编码">
              <Input
                value={listProp.expressCode}
                placeholder="请输入物流编码"
                onBlur={(e) =>
                  setListProp({ ...listProp, expressCode: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item className="ml-auto">
              <Button type="primary" onClick={() => fetchList()}>
                查询
              </Button>
              &emsp;
              <Button type="primary" onClick={() => btnClick("", "add")}>
                新增
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="bg-white p-4">
          <Table
            tableList={tableList}
            columns={columns}
            total={total}
            pageChange={fetchList}
            tableProp={{
              scroll: {
                y: "calc(100vh - 18rem)",
              },
            }}
            btnClick={btnClick}
          />
        </div>
      </Col>
      <Col span={9}>
        <div className="bg-white h-full p-1">
          <h2 className="pl-6">物流详情</h2>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            form={form}
            onFinish={onFinish}
            //   onValuesChange={onFormLayoutChange}
          >
            <Form.Item
              name="expressCode"
              label="物流编码"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入物流编码" />
            </Form.Item>
            <Form.Item
              name="expressName"
              label="物流名称"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入物流名称" />
            </Form.Item>
            <Form.Item name="expressTel" label="物流电话">
              <Input placeholder="请输入物流电话" />
            </Form.Item>
            <Form.Item name="expressIcon" label="物流图标">
              <Input placeholder="请输入物流图标地址" />
            </Form.Item>
            <Form.Item name="expressDetail" label="物流详情">
              <Input.TextArea placeholder="请输入物流详情" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LogisticRender;
