import dynamic from "next/dynamic";

//
async function getCustomImageBlot(QuillComponent: any) {
  const ImageBlot = await QuillComponent.Quill.import("formats/image");
  class CustomImageBlot extends ImageBlot {
    static create(value: any) {
      const node: HTMLElement = super.create(value);
      node.setAttribute("alt", value.alt);
      node.setAttribute("src", value.src);
      node.dataset.src = value.dataSrc;
      return node;
    }

    static value(domNode: HTMLElement) {
      return {
        alt: domNode.getAttribute("alt") || "",
        src: domNode.getAttribute("src") || "",
        dataSrc: domNode.dataset.src || "",
      };
    }
  }
  return CustomImageBlot;
}
export const QuillNoSSRWriter = dynamic(
  async () => {
    const { default: QuillComponent } = await import("react-quill");
    //.. import dynamic some modules..
    const ImageBlot = await getCustomImageBlot(QuillComponent);
    //.. register some modules
    QuillComponent.Quill.register(ImageBlot);
    const Quill = ({ forwardedRef, ...props }: any) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );
    return Quill;
  },
  { loading: () => <p>loading</p>, ssr: false }
);
