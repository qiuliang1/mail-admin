import React, { useState, useMemo, useRef, useEffect } from "react";
import { spareUpload, spareId as spareIdFetch } from "@/api/bus";
import { cosView } from "@/api/ums";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ReactQuillRender(props) {
  const refs = useRef();
  //   const [heightText, setHeight] = useState("300px");
  const [valueText, setValueText] = useState("");
  const [handleValue, setHandleValue] = useState("");
    useEffect(() => {
        if(props.spareId) {
            getDetailInfo();
        }
    }, [props.spareId]);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
          ["blockquote", "code-block"], // 引用，代码块
          ["link", "image" /**'video' */], // 上传链接、图片、上传视频
          [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
          [{ list: "ordered" }, { list: "bullet" }], // 列表
          [{ script: "sub" }, { script: "super" }], // 上下标
          [{ indent: "-1" }, { indent: "+1" }], // 缩进
          [{ direction: "rtl" }], // 文本方向
          [{ size: ["small", false, "large", "huge"] }], // 字体大小
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
          [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
          [{ font: [] }], // 字体
          [{ align: [] }], // 对齐方式
          ["clean"], // 清除字体样式
        ],
        handlers: {
          image: () => {
            imageHandler.call(this, props);
          },
        },
      },
    }),
    []
  );

  const getImageView = async (img) => {
    const k = img ?? "/PRODUCES/64100a630fb660d166521ca7.jpg";
    const quill = refs?.current?.getEditor();
    console.log("[ quill ] >", quill);
    const { data } = await cosView({
      k,
    });
    const cursorPosition = quill.getLength() ?? 0; //获取当前光标位置
    quill.insertEmbed(cursorPosition, "image", data, '/PRODUCES/64100a630fb660d166521ca7.jpg'); //插入图片
    console.log('[ valueText ] >', handleValue)
    // setValueText(`${handleValue}<img src="${data}" alt="${k}">`);
    quill.setSelection(cursorPosition + 1); //光标位置加1
  };

  const getDetailInfo = async () => {
    const quill = refs?.current?.getEditor();
    const { data } = await spareIdFetch(props.spareId);

    setValueText(`${data?.detail ?? ''}`);
    setHandleValue(`${data?.detail ?? ''}`)
    const cursorPosition = quill.getLength() ?? 0; //获取当前光标位置
    quill.setSelection(cursorPosition + 1); //光标位置加1
  };

  const imageHandler = (action) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      try {
        const file = input.files[0];
        console.log("[ file ] >", file);
        const formData = new FormData();
        formData.append("id", props.spareId);
        formData.append("file", file);
        const { data } = await spareUpload(formData);
        getImageView(data);
      } catch (error) {}
    };
  };

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//   ];
  const handleHtml = (e) => {
    const quill = refs?.current?.getEditor();
    console.log("[ quill ] >", quill);
    setValueText(e);
    setHandleValue(e)
    props.handleParams(e);
  };
  const options = {
    placeholder: "请输入内容...",
    theme: "snow",
    readOnly: false, // 是否只读
    className: "ql-editor", //组件要加上(className=“ql-editor”)样式类名,否则空格不回显
    onChange: handleHtml,
    value: valueText,
    modules,
    ref: refs,
    // formats,
    style: {
      //   width: widthText,
      height: "100%",
      //   overflow: "hidden",
      // borderBottom: "1px solid #ccc",
    },
  };

  return <ReactQuill theme="snow" {...options} />;
}

export default ReactQuillRender;
