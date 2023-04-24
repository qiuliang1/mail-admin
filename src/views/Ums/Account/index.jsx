import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, AutoComplete } from "antd";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import {
  userList,
  userRegister,
  userModify,
  userSetRole,
  roleSelect,
  userCheck,
  userDelete,
} from "@/api/ums";

const UserRender = () => {
  const [tableList, setTableList] = useState([]);
  const [open, setOpen] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [userName, setUserName] = useState("");
  const [nickName, setNickName] = useState("");
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  //   const onFinish = (values) => {
  //     console.log("Finish:", values);
  //   };
  useEffect(() => {
    getAuthTree();
  }, []);
  const getUserList = async (current, pageSize) => {
    const { data } = await userList({ userName, nickName, current, pageSize });
    console.log("[ data ] >", data);
    const { records, total } = data;
    setTableList(records);
    setTotal(total);
  };

  const btnClick = (p, isEdit) => {
    console.log("[ p ] >", p);
    isEdit ? form.setFieldsValue(p) : form.resetFields();
    setOpen(true);
  };
  const getAuthTree = async () => {
    const { data } = await roleSelect();
    setRoleList(data);
  };

  const columns = [
    {
      title: "用户名",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "昵称",
      dataIndex: "nickName",
      key: "nickName",
    },
    {
      title: "电话",
      dataIndex: "cellPhone",
      key: "cellPhone",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "创建时间",
      dataIndex: "createdTime",
      key: "createdTime",
    },
  ];

  const handleConfirm = async () => {
    const { passwd, ...fieldVal } = form.getFieldsValue(true);
    const request = fieldVal.id ? userModify : userRegister;
    const { data } = await request({
      ...fieldVal,
      passwd: window.btoa(passwd),
    });
    if (data || fieldVal.id) {
      getUserList();
      setOpen(false);
      bindPermission(data || fieldVal.id);
    }
  };

  const bindPermission = async (roleId) => {
    const { data } = await userSetRole({
      roleId,
    });
    return data;
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        ["@163.com", "@qq.com", "@gmail.com"].map(
          (domain) => `${value}${domain}`
        )
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <>
      <div className="bg-white mb-2 p-2">
        <Form layout="inline">
          <Form.Item name="roleName" label="用户">
            <Input
              value={userName}
              placeholder="请输入用户名称"
              onBlur={(e) => setUserName(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="nickName" label="昵称">
            <Input
              value={userName}
              placeholder="请输入昵称"
              onBlur={(e) => setNickName(e.target.value)}
            />
          </Form.Item>
          <Form.Item className="ml-auto">
            <Button type="primary" onClick={() => getUserList()}>
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
          pagination={{
            ...pagination,
            showTotal: (total) => `共 ${total} 条`,
          }}
          bordered
          rowKey="id"
          dataSource={tableList}
        /> */}
        <Table
          tableList={tableList}
          columns={columns}
          total={total}
          pageChange={getUserList}
          btnClick={btnClick}
          deleteFetch={userDelete}
        />
        <Modal
          open={open}
          title={"用户信息"}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
        >
          <Form form={form} labelCol={{ span: 6 }} className="mx-auto mt-2">
            <Form.Item
              name="userName"
              label="用户名"
              rules={[
                { required: true, message: "请输入用户名!" },
                {
                  validator: async (_, value) => {
                    console.log("[ value ] >", value);
                    const { data } = await userCheck(value);
                    if (data) {
                      return Promise.resolve();
                    }
                    // if (!value || getFieldValue("userName") === value) {
                    //   return Promise.resolve();
                    // }
                    return Promise.reject(
                      new Error("该用户名不可用，请重新输入!")
                    );
                  },
                },
              ]}
            >
              <Input
                disabled={form.getFieldValue("id")}
                placeholder="请输入用户名"
              />
            </Form.Item>
            <Form.Item
              name="passwd"
              label="密码"
              rules={[
                { required: true, message: "请输入密码!" },
                {
                  type: "string",
                  min: 6,
                  max: 18,
                  message: "密码应在6-18位之间！",
                },
              ]}
            >
              <Input.Password
                disabled={form.getFieldValue("id")}
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item name="roleId" label="角色">
              <Select placeholder="请选择所属角色" allowClear>
                {roleList.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="nickName" label="昵称">
              <Input placeholder="请输入昵称" />
            </Form.Item>
            <Form.Item name="cellPhone" label="电话">
              <Input placeholder="请输入电话" />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[{ type: "email", message: "请输入正确的邮箱！" }]}
            >
              <AutoComplete
                options={websiteOptions}
                onChange={onWebsiteChange}
                placeholder="请输入邮箱"
              >
                <Input />
              </AutoComplete>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default UserRender;
