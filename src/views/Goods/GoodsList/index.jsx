import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Switch, TreeSelect, Radio, Steps } from "antd";
import { FileTextOutlined, FileImageOutlined } from "@ant-design/icons";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import CategoryRender from "./components/category";
import UploadImg from "./components/Upload";
import {
  produceList,
  produceInsert,
  produceModify,
  produceDelete
} from "@/api/bus";
import { cateTree } from "@/api/ums";

const ProductRender = () => {
  const [tableList, setTableList] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [treeVal, setTreeVal] = useState("");
  const [produceProp, setProduceProps] = useState({
    produceName: null,
    produceModel: null,
    cateId: null,
    isSale: null,
  });
  const [produceId, setProduceId] = useState(null);
  const [total, setTotal] = useState(0);
  const [cateData, setCateData] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const columns = [
    {
      title: "产品名称",
      dataIndex: "produceName",
      key: "produceName",
    },
    {
      title: "产品型号",
      dataIndex: "produceModel",
      key: "produceModel",
    },
    {
      title: "分类",
      dataIndex: "cateName",
      key: "cateName",
    },
    {
      title: "标签",
      dataIndex: "isSale",
      key: "isSale",
      width: "10%",
      align: "center",
      render: (val) => <Switch defaultChecked={val} />,
    },
    {
      title: "创建时间",
      dataIndex: "createdTime",
      key: "createdTime",
    },
  ];
  useEffect(() => {
    getProductList();
  }, [produceProp]);

  useEffect(() => {
    getCateTree();
  }, []);
  const getProductList = async (current = 1, pageSize = 10) => {
    const { data } = await produceList({ ...produceProp, current, pageSize });
    console.log("[ data ] >", data);
    const { records, total } = data;
    setTableList(records);
    setTotal(total);
  };

  const getCateTree = async () => {
    const { data } = await cateTree({});
    setCateData(data);
  };

  const onSelect = (keys) => {
    console.log("[ keys ] >", keys);
    setProduceProp(keys[0], "cateId");
  };

  const btnClick = (p, isEdit) => {
    console.log("[ p ] >", p);
    switch (isEdit) {
      case "add":
        setProduceId(null);
        form.resetFields();
        setOpen(true);
        break;
      case "edit":
        form.setFieldsValue(p);
        setProduceId(p.id);
        setOpen(true);
        break;
      case "info":
        navigateTo(p);
        break;
      default:
        break;
    }
  };

  const navigateTo = (data) => {
    navigate("/commodity/spare", { state: data });
  };

  const handleConfirm = async () => {
    if (current === 1) {
      prev();
      return;
    }
    try {
      const fieldVal = await form.validateFields();
      const fieldsVal = form.getFieldsValue(true);
      // const fieldVal = form.getFieldsValue(true);
      console.log("[ fieldVal ] >", fieldVal);
      // return
      const request = fieldsVal.id ? produceModify : produceInsert;
      const { data } = await request(fieldVal);
      if (data) {
        // getProductList(1, 10);
        // setOpen(false);
        setProduceId(data);
        next();
      }
    } catch (error) {
      console.log("Failed:", error);
    }
  };

  const handleCancel = () => {
    getProductList(1, 10);
    setCurrent(0);
    setOpen(false);
  };

  const setProduceProp = (val, prop) => {
    const props = JSON.parse(JSON.stringify(produceProp));
    props[prop] = val;
    setProduceProps(props);
  };

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "产品处理",
      describe: "提交产品的基本信息",
      content: (
        <Form form={form} labelCol={{ span: 6 }} className="mx-auto mt-2">
          <Form.Item
            name="produceName"
            label="产品名称"
            rules={[{ required: true, message: "请输入产品名称!" }]}
          >
            <Input placeholder="请输入产品名称" />
          </Form.Item>
          <Form.Item
            name="cateId"
            label="所属类别"
            rules={[{ required: true, message: "请选择所属类别!" }]}
          >
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              value={treeVal}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              placeholder="Please select"
              allowClear
              fieldNames={{
                value: "id",
                label: "name",
              }}
              treeDefaultExpandAll
              treeData={cateData}
              onChange={(val) => setTreeVal(val)}
            />
          </Form.Item>
          <Form.Item name="isSale" label="上架" initialValue={true}>
            <Radio.Group>
              <Radio value={true}> 是 </Radio>
              <Radio value={false}> 否 </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "产品图片",
      describe: "产品轮播图展示",
      disabled: !produceId,
      content: <UploadImg produceId={produceId} />,
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    describe: item.describe,
    disabled: item.disabled,
  }));
  const stepChange = (val) => {
    setCurrent(val);
  };

  return (
    <div className="flex h-full">
      <div className="w-1/6 bg-white h-[calc(100%_+_.4rem)]">
        <CategoryRender
          treeData={cateData}
          reFetchCategory={getCateTree}
          onSelect={onSelect}
        />
      </div>
      <div className="ml-2 w-5/6">
        <div className="bg-white mb-2 p-2">
          <Form layout="inline">
            <Form.Item name="roleName" label="产品">
              <Input
                value={produceProp.produceName}
                placeholder="请输入产品名称"
                onBlur={(e) => setProduceProp(e.target.value, "produceName")}
              />
            </Form.Item>
            <Form.Item className="ml-auto">
              <Button type="primary" onClick={() => getProductList()}>
                查询
              </Button>
              &emsp;
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
            deleteFetch={produceDelete}
            operation={[
              {
                icon: <FileTextOutlined />,
                type: "info",
              },
            ]}
          />
          <Modal
            open={open}
            title={"产品信息"}
            handleCancel={handleCancel}
            footer={[
              <Button type="primary" onClick={handleConfirm}>
                {current === 1 ? "上一步" : "提交，下一步"}
              </Button>,
              <Button onClick={handleCancel}>关闭</Button>,
            ]}
          >
            <Steps
              className="mt-6 mb-6"
              current={current}
              onChange={stepChange}
              items={items}
            />
            <div>{steps[current].content}</div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProductRender;
