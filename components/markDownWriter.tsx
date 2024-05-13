import dynamic from "next/dynamic";
import { useState } from "react";

export const MarkDownEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

export const EditerMarkdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);
