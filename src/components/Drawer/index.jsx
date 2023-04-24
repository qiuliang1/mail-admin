import React from "react";
import { Button, Drawer } from "antd";
const DrawerRender = (props) => {
  const handleOk = (e) => {
    console.log(e);
    // setOpen(false);
    props.handleConfirm();
  };
  const handleCancel = (e) => {
    console.log(e);
    props.handleCancel();
  };
  const footer = () => (
    <div className="float-right">
      <Button onClick={handleOk} type="primary">确认</Button>&emsp;
      <Button onClick={handleCancel}>取消</Button>
    </div>
  );

  return (
    <>
      <Drawer className="qg-drawer" onClose={handleCancel} footer={(footer())} {...props}>
        {props.children}
      </Drawer>
    </>
  );
};
export default DrawerRender;
