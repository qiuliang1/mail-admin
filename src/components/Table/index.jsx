import React, { useState, useEffect } from "react";
import { Table, Button, Divider, Popconfirm, message } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";

const TableRender = (props) => {
  const [tableHead] = useState(props.columns);
  const [messageApi, contextHolder] = message.useMessage();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  //   setTableHead(props.columns)
  useEffect(() => {
    const { current, pageSize } = pagination;
    pageChange(current, pageSize);
    // setTableHead(props.columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const delConfirm = async ({ id = "" }) => {
    // console.log('[ record ] >', record)
    if (!id) {
      messageApi.open({
        type: "error",
        content: "删除处理未获取数据ID！",
      });
      return;
    }
    try {
      const { data } = await props.deleteFetch(id);
      if (data) {
        messageApi.open({
          type: "success",
          content: "删除成功",
        });
        props.pageChange()
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error,
      });
    }
  };

  const actionRender = (_, record) => {
    return (
      <div className="qg-basic-table-action">
        {props.operation?.map((v) => (
          <>
            <Button
              type="link"
              key={v.type}
              onClick={() => props.btnClick(record, v.type)}
            >
              {v.icon}
            </Button>
            <Divider type="vertical" />
          </>
        ))}
        <Button type="link" onClick={() => props.btnClick(record, "edit")}>
          <FormOutlined />
        </Button>

        {props.deleteFetch && (
          <>
            <Divider type="vertical" />
            <Popconfirm
              placement="top"
              title="删除记录"
              description="你确定删除此记录吗？"
              onConfirm={() => delConfirm(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </>
        )}
      </div>
    );
  };
  const columns = [
    // ...props.columns,
    ...tableHead.map((v) => {
      if (!v.render) {
        return { ...v, render: (val) => <span>{val ?? "-"}</span> };
      }
      return v;
    }),
    {
      title: "操作",
      dataIndex: "action",
      key: "operation",
      align: "center",
      render: actionRender,
    },
  ];

  const pageChange = (current, pageSize) => {
    setPagination({
      current,
      pageSize,
    });
    props.pageChange(current, pageSize);
  };

  const tableProps = {
    pagination: props.pagination
      ? props.pagination
      : {
          ...pagination,
          total: props.total ?? 0,
          onChange: pageChange,
          showTotal: (total) => `共 ${total} 条`,
        },
    dataSource: props.tableList,
    columns,
    scroll: { y: "calc(100vh - 13rem)" },
    ...props.tableProp,
  };

  return (
    <>
      {contextHolder}
      <Table bordered rowKey="id" {...tableProps} />
    </>
  );
};

export default TableRender;
