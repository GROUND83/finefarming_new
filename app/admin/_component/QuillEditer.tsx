import { useMemo, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { getUploadUrl } from "@/lib/uploadUrl";
import dynamic from "next/dynamic";

async function getCustomImageBlot(QuillComponent: any) {
  const ImageBlot = await QuillComponent.Quill.import("formats/image");
  class CustomImageBlot extends ImageBlot {
    static create(value: any) {
      const node: HTMLElement = super.create(value);
      node.setAttribute("class", "rich-image");
      node.setAttribute("alt", value.alt);
      node.setAttribute("src", value.src);
      node.setAttribute("width", "100%");
      node.setAttribute("height", "auto");
      return node;
    }

    static value(domNode: HTMLElement): any {
      return {
        alt: domNode.getAttribute("alt") || "",
        src: domNode.getAttribute("src") || "",
        width: domNode.getAttribute("width") || "100%",
        height: domNode.getAttribute("height") || "auto",
      };
    }
  }
  return CustomImageBlot;
}
const ReactQuill = dynamic(
  async () => {
    const { default: QuillComponent } = await import("react-quill");
    //.. import dynamic some modules..
    const ImageBlot: any = await getCustomImageBlot(QuillComponent);
    //.. register some modules
    QuillComponent.Quill.register(ImageBlot);
    const Quill = ({ forwardedRef, ...props }: any) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );
    return Quill;
  },
  { ssr: false }
);
type editProps = {
  content: any;
  setContent: any;
};
export default function QuillEditor({ content, setContent }: editProps) {
  const quillRef = useRef<any>(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      //   const file = input.files[0];
      if (input.files) {
        const file = input.files[0];
        console.log("file", file);
        //
        document.body.appendChild(input);
        if (file.size > 2000000) {
          alert("이미지 사이즈가 2mb를 초과 하였습니다.");
          return;
        } else {
          // 현재 커서 위치 저장
          const { success, result } = await getUploadUrl();
          console.log(result);
          if (result) {
            let otherImage = new FormData();
            otherImage.append("file", file);
            const { id, uploadURL } = result;
            const response = await fetch(uploadURL, {
              method: "POST",
              body: otherImage,
            });
            if (response.status !== 200) {
              return;
            }
            const imgUrl = `https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/${id}/public`;
            const quill = quillRef.current?.getEditor();

            let index = quill.getSelection().index;
            const delta = quill.insertEmbed(index, "image", {
              src: imgUrl,
              alt: "your alt",
            });
            // quill.removeFormat(index, index + 1);

            document.body.removeChild(input);
          }
        }
      } else {
        return;
      }

      try {
        // console.log(formData.get("file"));
        // console.log(url);
        // quillRef.getEditor().deleteText(range.index, 1);
        // quillRef.getEditor().insertEmbed(range.index, "image", url);
        // quillRef.getEditor().setSelection(range.index + 1);
        // const result = await imgUpload(formData);
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [
            {
              color: [],
            },
            { background: [] },
          ],
          ["link", "image"],
        ],
        handlers: {
          image: imageHandler,
          // link: function (value: any) {
          //   if (value) {
          //     const href = prompt("Enter the URL");
          //     this.quill.format("link", href);
          //   } else {
          //     this.quill.format("link", false);
          //   }
          // },
        },
        clipboard: {
          matchVisual: false,
        },
      },
    };
  }, []);

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "align",
    "color",
    "background",
    "size",
    "h1",
    "image",
  ];

  return (
    <div className="w-full">
      <ReactQuill
        forwardedRef={quillRef}
        style={{ width: "100%", height: "800px" }}
        placeholder="본문을 입력하세요..."
        modules={modules}
        formats={formats}
        value={content}
        onChange={(e: any) => {
          setContent(e);
        }}
        theme="snow"
      />
    </div>
  );
}
