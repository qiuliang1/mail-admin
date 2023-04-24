import React, { useEffect, useState } from "react";
import { Table, Button, Divider, Form, Input, Select } from "antd";
import { DeleteOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";
import Modal from "@/components/Modal";
import { authTree, authModify, authInsert } from "@/api/ums";

const PermissionRender = () => {
  const [tableList, setTableList] = useState([]);
  const [expandIds, setExpandIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({})
  const [title, setTitle] = useState('')
  const [form] = Form.useForm();
  //   const onFinish = (values) => {
  //     console.log("Finish:", values);
  //   };
  useEffect(() => {
    getAuthTree();
  }, []);
  const getAuthTree = async () => {
    const { data } = await authTree({ sysType: "" });
    console.log("[ data ] >", data);
    setTableList(data);
    setExpandIds([data[0].id]);
  };

  const btnClick = (p, type) => {
    console.log("[ p ] >", p);
    type === '修改' ? form.setFieldsValue(p) : form.resetFields();
    setTitle(`${p.name} ${type}权限信息`)
    setCurrent(p)
    setOpen(true);
  };
  const actionRender = (_, record) => {
    return (
      <div className="qg-basic-table-action">
        {record.type !== "Point" && (
          <>
            <Button type="link" onClick={() => btnClick(record, '新增')}>
              <PlusOutlined />
            </Button>
            <Divider type="vertical" />
          </>
        )}
        <Button type="link" onClick={() => btnClick(record, '修改')}>
          <FormOutlined />
        </Button>

        <Divider type="vertical" />
        <Button type="link" onClick={() => btnClick(record, 'del')} danger>
          <DeleteOutlined />
        </Button>
      </div>
    );
  };

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "路径",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort",
    },
    {
      title: "图标",
      dataIndex: "icon",
      key: "icon",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "icon",
      render: (val) => {
        const list = {
          System: "系统",
          Function: "功能",
          Point: "功能点",
        };
        return <span>{list[val]}</span>;
      },
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "operation",
      render: actionRender,
    },
  ];

  const expandable = {
    expandedRowKeys: expandIds,
    onExpand: (expanded, record) => {
      if (expanded) {
        setExpandIds((ids) => {
          ids.push(record.id);
          return ids;
        });
      } else {
        setExpandIds((ids) => {
          const i = ids.findIndex((id) => id === record.id);
          ids.splice(i, i + 1);
          return ids;
        });
      }
    },
  };

  const handleConfirm = async () => {
    console.log("[ form.getFieldsValue(true) ] >", form.getFieldsValue(true));
    const fieldVal = form.getFieldsValue(true);
    const pid = fieldVal.id ? current.pid : current.id
    const request = {
      authName: fieldVal.name,
      authPath: fieldVal.path,
      authIcon: fieldVal.icon,
      authType: fieldVal.type,
      authLevel: current?.level + 1,
      pid,
      ...fieldVal,
    };
    const requestType = fieldVal.id ? authModify : authInsert;
    const { data } = await requestType(request);
    if (data) {
      getAuthTree();
      setOpen(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="qg-basic-table w-full h-full">
      <Table
        scroll={{ y: "calc(100vh - 48px - 5rem)" }}
        columns={columns}
        pagination={false}
        rowKey="id"
        expandable={expandable}
        dataSource={tableList}
      />
      <Modal
        open={open}
        title={title}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      >
        <Form form={form} labelCol={{ span: 6 }} className="w-2/3 mx-auto mt-5">
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: "请填写权限名称!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="path" label="路径">
            <Input />
          </Form.Item>
          <Form.Item
            name="sort"
            label="排序"
            rules={[{ required: true, message: "请填入排序!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="icon" label="图标">
            <Input />
          </Form.Item>
          <Form.Item name="type" label="类型">
            <Select>
              <Select.Option value="System">系统</Select.Option>
              <Select.Option value="Function">功能</Select.Option>
              <Select.Option value="Point">功能点</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PermissionRender;
