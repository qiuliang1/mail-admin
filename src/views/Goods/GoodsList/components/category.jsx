import React, { useEffect, useState } from "react";
import { Tree, Button, Popover, Form, Input } from "antd";
import { FormOutlined, PlusOutlined } from "@ant-design/icons";
import { cateInsert, cateModify } from "@/api/ums";

const CategoryRender = (props) => {
  const [cateData, setCateData] = useState([]);
  const [open, setOpen] = useState(false);
  const [btnState, setBtnState] = useState("");
  const [expandedKeys] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setCateData(props.treeData)
  }, [props.treeData]);

  const onDragEnter = (info) => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // setExpandedKeys(info.expandedKeys)
  };

  const onDrop = (info) => {
    console.log(info);
    const dropKey = info.node.id;
    const dragKey = info.dragNode.id;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...cateData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      // Has children
      info.node.props.expanded &&
      // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar = [];
      let i;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setCateData(data);
  };

  const onSelect = (selectedKeys) => {
    props.onSelect(selectedKeys)
  }

  const getCurrentLevelLen = (id) => {
    if (!id) return cateData.length;
    let data = 0;
    const loop = (list) => {
      list.forEach((v) => {
        if (v.id === id) {
          data = v?.children?.length ?? 0;
        } else {
          v.children && v.children.length && loop(v.children);
        }
      });
    };
    loop(cateData);
    return data;
  };

  const categroyFetch = async (category = {}) => {
    const cateForm = form.getFieldsValue(true);
    console.log("[ categroy ] >", category, cateForm);
    // console.log("[ btnState ] >", getCurrentLevelLen(category.id));
    const request = btnState === "add" ? cateInsert : cateModify;
    const otherProp = {
      cateOrd: getCurrentLevelLen(category.id),
      catePid: category?.id ?? "LhKGLltBXVJYIjt9yz4vM",
      ...cateForm
    };
    handleOpenChange(category, false)
    const { data } = await request(otherProp);
    if(data) {
      props.reFetchCategory()
    }

  };

  const edit = (e, type) => {
    setBtnState(type);
    if(type === "add") {
      form.resetFields()
      return
    }
    const prop = {
      cateName: e.name,
      cateDesc: e.desc,
      cateOrd: e.sort,
      catePid: e.pid,
      cateIcon: e.icon,
      ...e
    };
    form.setFieldsValue(prop);
  };

  const FormPop = (prop = {}) => {
    return (
      <>
        <Form form={form} layout="vertical" requiredMark={"optional"}>
          <Form.Item
            label="分类名称"
            name="cateName"
            rules={[{ required: true, message: "请输入分类名称!" }]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>
          <Form.Item label="分类描述" name="cateDesc">
            <Input placeholder="请输入分类描述" />
          </Form.Item>
          <Form.Item label="图标" name="cateIcon">
            <Input placeholder="请输入分类图标" />
          </Form.Item>
        </Form>
        <div className="text-right">
          <Button
            className="p-0 px-1 h-auto"
            type="link"
            onClick={() => categroyFetch(prop.cateProp)}
          >
            确认
          </Button>
          <Button
            className="p-0 px-1 h-auto"
            type="link"
            onClick={() => handleOpenChange(prop.cateProp, false)}
          >
            关闭
          </Button>
        </div>
      </>
    );
  };

  const handleOpenChange = (e = {}, newOpen) => {
    console.log("[ e, newOpen ] >", e, newOpen);
    e.id ? (e.open = newOpen) : setOpen(newOpen);
  };

  const TitleRender = (e) => (
    <div className="flex justify-between items-start">
      <span>{e.name}</span>
      <span>
        <Popover
          content={<FormPop cateProp={e} />}
          title={e.name + " 下新增"}
          trigger="click"
          open={e.open}
          onOpenChange={(newOpen) => handleOpenChange(e, newOpen)}
        >
          <Button
            className="p-0 px-1 h-auto"
            type="link"
            onClick={() => edit(e, "add")}
          >
            <PlusOutlined />
          </Button>
          <Button
            className="p-0 px-1 h-auto"
            type="link"
            onClick={() => edit(e, "edit")}
          >
            <FormOutlined />
          </Button>
        </Popover>

        {/* <Button
          className="p-0 px-1 h-auto"
          type="link"
          onClick={() => props.btnClick(e, "delete")}
          danger
        >
          <DeleteOutlined />
        </Button> */}
      </span>
    </div>
  );

  return (
    <>
      <div className="text-right">
        <Popover
          content={<FormPop />}
          open={open}
          onOpenChange={(newOpen) => handleOpenChange({}, newOpen)}
          title="新增分类"
          trigger="click"
        >
          <Button
            className="p-0 px-1"
            type="link"
            onClick={() => edit( '', "add")}
          >
            新增
          </Button>
        </Popover>
      </div>
      <Tree
        className="draggable-tree mt-2"
        defaultExpandedKeys={expandedKeys}
        draggable
        blockNode
        fieldNames={{
          key: "id",
          title: "name",
        }}
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        onSelect={onSelect}
        treeData={cateData}
        titleRender={TitleRender}
      />
    </>
  );
};

export default CategoryRender;
