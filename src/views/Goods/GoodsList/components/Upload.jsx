import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import { cosDelete, altDelete } from "@/api/ums";
import { produceAtlas } from "@/api/bus";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImg = (props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const getFileList = async () => {
      const { data } = await produceAtlas(props.produceId);
      if (data?.length) {
        setFileList(data);
      }
    };
    getFileList();
  }, [props]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file?.url.substring(file?.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    console.log("[ newFileList ] >", newFileList);
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  /**
   * 根据 jpeg、png File 文件对象，获取 webp 格式的 File 文件对象
   * @param {File} imageFile jpeg、png图片文件对象
   * @returns image/webp File
   */
  const getWebpFileByImageFile = (imageFile, size = 1) => {
    const base64ToFile = (base64, fileName) => {
      let arr = base64.split(","),
        type = arr[0].match(/:(.*?);/)[1],
        bstr = window.atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], fileName, {
        type,
      });
    };
    return new Promise((resolve, reject) => {
      const imageFileReader = new FileReader();
      imageFileReader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          const canvas = document.createElement("canvas");
          canvas.width = image.width * size;
          canvas.height = image.height * size;
          canvas.getContext("2d").drawImage(image, 0, 0);
          resolve(
            base64ToFile(
              canvas.toDataURL("image/webp"),
              imageFile.name.split(".")[0] + ".webp"
            )
          );
        };
      };
      imageFileReader.readAsDataURL(imageFile);
    });
  };

  const beforeUpload = async (file) => {
    let size = 1,
      wfile;
    do {
      wfile = await getWebpFileByImageFile(file, size);
      size -= 0.1;
    } while (size > 0.8 || wfile.size > 1000000)

    if (wfile.size > 1000000) {
      // 压缩后大于1M
      message.error("图片体积过大，请选择10M以内的图片!");

      return false;
    }
    return wfile;
  };

  const handleRemove = async (file) => {
    console.log("[ file remove ] >", file);
    const { response, name } = file;
    const imgId = response ? response.data : name;
    const { data: removeData } = await cosDelete({ data: [imgId] });
    const { data } = await altDelete({ params: { name: imgId } });
    if (!removeData || !data) {
      return false;
    }
    message.success("图片已删除");
  };

  return (
    <>
      <Upload
        action="/yc/bus/produce/upload"
        listType="picture-card"
        fileList={fileList}
        method="put"
        data={{
          id: props.produceId,
        }}
        headers={{
          "auth-token": localStorage.getItem("authToken"),
        }}
        beforeUpload={beforeUpload}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {fileList.length >= 6 ? null : uploadButton}
      </Upload>
      <a href="https://oktools.net/tinyimg" target="_blank" rel="noreferrer">
        图片太大，请跳转至调整页面
      </a>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadImg;
