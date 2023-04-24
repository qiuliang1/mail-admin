import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Input, Switch, Radio, Tree } from "antd";
import Table from "@/components/Table";
import Drawer from "@/components/Drawer";
import {
  roleList,
  roleInsert,
  roleModify,
  roleAuthInsert,
  roleAuthGetAuth,
  authTree,
  roleDelete,
} from "@/api/ums";

const RoleRender = () => {
  const [tableList, setTableList] = useState([]);
  const [open, setOpen] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [roleName, setRoleName] = useState("");
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  //   const onFinish = (values) => {
  //     console.log("Finish:", values);
  //   };
  useEffect(() => {
    // getRoleList();
    showTree();
  }, []);
  const getRoleList = async (current = 1, pageSize = 10) => {
    const { data } = await roleList({ current, pageSize, roleName });
    console.log("[ data ] >", data);
    const { total, records } = data;
    setTableList(records);
    setTotal(total);
  };

  const showTree = async () => {
    const { data } = await authTree({ sysType: "" });
    setTreeData(data);
  };

  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const btnClick = (p, isEdit) => {
    console.log("[ p ] >", p);
    isEdit ? form.setFieldsValue(p) : form.resetFields();
    p && getAuthTree(p.id);
    setOpen(true);
  };
  const getAuthTree = async (roleId) => {
    const { data } = await roleAuthGetAuth({ roleId });
    setCheckedKeys(data);
  };

  const columns = [
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "描述",
      dataIndex: "roleDesc",
      key: "roleDesc",
    },
    {
      title: "状态",
      dataIndex: "isEnabled",
      key: "isEnabled",
      width: 100,
      align: "center",
      render: (val) => (
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          defaultChecked={val}
        />
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createdTime",
      key: "createdTime",
    },
  ];

  const handleConfirm = async () => {
    console.log("[ form.getFieldsValue(true) ] >", form.getFieldsValue(true));
    const fieldVal = form.getFieldsValue(true);
    const request = fieldVal.id ? roleModify : roleInsert;
    const { data } = await request(fieldVal);
    if (data || fieldVal.id) {
      getRoleList();
      setOpen(false);
      bindPermission(data || fieldVal.id);
    }
  };
  const bindPermission = async (roleId) => {
    const { data } = await roleAuthInsert({
      roleId,
      authIds: checkedKeys,
    });
    return data;
  };
  const handleCancel = () => {
    setCheckedKeys([]);
    setOpen(false);
  };

  return (
    <>
      <div className="bg-white mb-2 p-2">
        <Form layout="inline" className="justify-between">
          <Form.Item name="roleName" label="角色">
            <Input
              value={roleName}
              placeholder="请输入角色名称"
              onBlur={(e) => setRoleName(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => getRoleList()}>
              查询
            </Button>
            &emsp;
            <Button type="primary" onClick={() => btnClick()}>
              新增
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="qg-basic-table w-full h-[calc(100%_-_48px)] overflow-auto">
        {/* <Table
          scroll={{ y: "calc(100vh - 13rem)" }}
          columns={columns}
          bordered
          rowKey="id"
          dataSource={tableList}
        /> */}
        <Table
          tableList={tableList}
          columns={columns}
          total={total}
          pageChange={getRoleList}
          btnClick={btnClick}
          deleteFetch={roleDelete}
        />
        <Drawer
          open={open}
          title={"角色信息"}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
        >
          <Form form={form} labelCol={{ span: 6 }} className="mx-auto mt-2">
            <Form.Item
              name="roleName"
              label="角色名称"
              rules={[{ required: true, message: "请输入角色名称!" }]}
            >
              <Input placeholder="请输入角色名称" />
            </Form.Item>
            <Form.Item name="roleDesc" label="角色描述">
              <Input.TextArea rows={4} placeholder="请输入角色描述" />
            </Form.Item>
            <Form.Item name="isEnabled" label="是否启用" initialValue={true}>
              <Radio.Group>
                <Radio value={true}> 是 </Radio>
                <Radio value={false}> 否 </Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
          <Divider>权限分配</Divider>
          <Tree
            checkable
            fieldNames={{
              title: "name",
              key: "id",
            }}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={treeData}
          />
        </Drawer>
      </div>
    </>
  );
};

export default RoleRender;
