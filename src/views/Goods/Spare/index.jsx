import React, { useState } from "react";
import { LeftOutlined, EditOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Input, InputNumber, Radio, Switch } from "antd";
import ReactDraftRender from "./components/ReactDraft";
import Table from "@/components/Table";
import Drawer from "@/components/Drawer/index";
import Modal from "@/components/Modal/index";
import { spareList, spareInsert, spareModify, spareDetail, spareDelete } from "@/api/bus";
import { PakoClass } from "@/utils/cipher";

const SpareRender = () => {
  const [tableList, setTableList] = useState([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [drawOpen, setDrawOpen] = useState(false);
  const [quiltValue, setQuiltValue] = useState("");
  const [produce, setProduce] = useState({});
  const [spare, setSpare] = useState({})
  const location = useLocation();
  const nav = useNavigate()
  const [form] = Form.useForm();
  const pako = new PakoClass();
  const columns = [
    {
      title: "备件名称",
      dataIndex: "spareName",
      key: "spareName",
    },
    {
      title: "备件规格",
      dataIndex: "spareSize",
      key: "spareSize",
    },
    {
      title: "库存",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "启用",
      dataIndex: "isEnabled",
      key: "isEnabled",
      width: "10%",
      align: "center",
      render: (val) => <Switch defaultChecked={val} />,
    },
  ];
  const getProductList = async (current, pageSize) => {
    const { data } = await spareList({
      produceId: getProduce("id"),
      current,
      pageSize,
    });
    console.log("[ data ] >", location);
    const { records, total } = data;
    setTableList(records);
    setTotal(total);
  };
  const getProduce = (prop) => {
    const { state } = location;
    setProduce(state);
    return state[prop] ?? "";
  };
  const btnClick = (p, isEdit) => {
    console.log("[ p ] >", p);
    setSpare(p)
    switch (isEdit) {
      case "add":
        form.resetFields();
        setOpen(true);
        break;
      case "edit":
        form.setFieldsValue(p);
        setOpen(true);
        break;
      case "detail":
        setDrawOpen(true)
        break;
      default:
        break;
    }
  };

  const handleConfirm = async () => {
    const fieldVal = form.getFieldsValue(true);
    // const pakoData = pako.zip(quiltValue).toString()
    // console.log("[ fieldVal ] >", fieldVal, pakoData);
    // console.log('[ pako.buffer ] >', pako.unzip(pakoData))
    // console.log("[ fieldVal11 ] >", quiltValue);
    const request = fieldVal.id ? spareInsert : spareModify;
    const { data } = await request({
      ...fieldVal,
      produceId: getProduce("id"),
    });
    console.log("[ data ] >", data);
    if (data) {
      getProductList(1, 10);
      setOpen(false);
    }
  };

  const detailConfirm = async () => {
    if (!spare.id) return
    const param = {
      spareId: spare.id,
      detail: quiltValue
    }
    const {data} = await spareDetail(param)
    console.log('[ data ] >', data)
  };

  const returnTo = () => {
    nav(-1)
  }

  return (
    <>
      <div className="bg-white mb-2 p-2">
        <Form layout="inline">
          <Form.Item label="">
            <Button onClick={returnTo}>
              <LeftOutlined /> 返回
            </Button>
            <h4 className="inline"> {produce?.produceName}</h4>
          </Form.Item>
          <Form.Item className="ml-auto">
            <Button type="primary" onClick={() => btnClick("", "add")}>
              新增
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="qg-basic-table w-full h-[calc(100%_-_48px)] overflow-auto">
        <Table
          tableList={tableList}
          columns={columns}
          total={total}
          pageChange={getProductList}
          btnClick={btnClick}
          deleteFetch={spareDelete}
          operation={[
            {
              icon: <EditOutlined />,
              type: "detail",
            },
          ]}
        />
      </div>
      <Modal
        open={open}
        title={"新增备件"}
        handleConfirm={handleConfirm}
        handleCancel={() => setOpen(false)}
      >
        <Form form={form} labelCol={{ span: 6 }} className="mx-auto mt-2">
          <Form.Item
            name="spareName"
            label="备件名称"
            rules={[{ required: true, message: "请输入备件名称!" }]}
          >
            <Input placeholder="请输入备件名称" />
          </Form.Item>
          <Form.Item name="spareSize" label="备件规格">
            <Input placeholder="请输入备件规格" />
          </Form.Item>

          <Form.Item name="stock" label="库存">
            <InputNumber />
          </Form.Item>
          <Form.Item name="price" label="价格">
            <InputNumber addonAfter="¥" />
          </Form.Item>
          <Form.Item name="isEnabled" label="是否启用" initialValue={true}>
            <Radio.Group>
              <Radio value={true}> 是 </Radio>
              <Radio value={false}> 否 </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
        {/* <Divider>备件详情</Divider>
          <ReactQuillRender handleParams={setQuiltValue} spareId={produce.id} /> */}
      </Modal>
      <Drawer
        open={drawOpen}
        title={"新增信息"}
        width="500px"
        handleConfirm={detailConfirm}
        handleCancel={() => setDrawOpen(false)}
      >
        <ReactDraftRender handleParams={setQuiltValue} spareId={spare.id} />
      </Drawer>
    </>
  );
};

export default SpareRender;
