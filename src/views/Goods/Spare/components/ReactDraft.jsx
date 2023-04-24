import React, { useState, useEffect } from "react";
import { spareUpload, spareId as spareIdFetch } from "@/api/bus";
import { cosView } from "@/api/ums";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

const ReactDraftRender = (props) => {
  // editor 实例
  //   const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
  const [editor, setEditor] = useState(null); // JS 语法

  // 编辑器内容
  const [html, setHtml] = useState("<p>hello</p>");

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    getDetailInfo();
  }, []);
  // 工具栏配置
  const toolbarConfig = {}; // JS 语法

  const getImageView = async (img, insertFn) => {
    const k = img ?? "/PRODUCES/64100a630fb660d166521ca7.jpg";
    const { data } = await cosView({
      k,
    });
    insertFn(data, img);
  };

  // 获取
  const getDetailInfo = async () => {
    let {
      data: { detail },
    } = await spareIdFetch(props.spareId);
    const regAlt = /(?<=alt=")(.+?)(?=")/g;
    const regImg = /(?<=img src=")(.+?)(?=")/g;
    // 匹配图片标签alt里面的内容
    const altMatches = detail.match(regAlt);
    const fetches = [];
    // 获取多个图片的alt 批量获取图片地址
    for (const k of altMatches) {
      fetches.push(cosView({ k }));
    }
    const resList = await Promise.allSettled(fetches);
    let i = -1;
    // 替换图片
    const newDetail = detail.replace(regImg, () => { // replace 回调根据匹配数量执行多次
      i += 1;
      return resList[i]?.value?.data ?? "";
    });
    setHtml(`${newDetail ?? ""}`);
  };

  // 编辑器配置
  // const editorConfig: Partial<IEditorConfig> = {    // TS 语法
  const editorConfig = {
    // JS 语法
    placeholder: "请输入内容...",
    MENU_CONF: {
      uploadImage: {
        async customUpload(file, insertFn) {
          console.log("[ file ] >", file);
          try {
            console.log("[ file ] >", file);
            const formData = new FormData();
            formData.append("id", props.spareId);
            formData.append("file", file);
            const { data } = await spareUpload(formData);
            getImageView(data, insertFn);
          } catch (error) {}
        },
      },
    },
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const handleEditorState = (e) => {
    setHtml(e);
    props.handleParams(e);
  };
  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => handleEditorState(editor.getHtml())}
          mode="default"
          style={{ height: "500px", overflowY: "hidden" }}
        />
      </div>
    </>
  );
};

export default ReactDraftRender;
