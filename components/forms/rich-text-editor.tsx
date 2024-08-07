"use client ";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { EditorProps } from "react-draft-wysiwyg";
// dynamic import to prevent error
const Editor = dynamic(
  () => {
    return import("react-draft-wysiwyg").then((mod) => {
      return mod.Editor;
    });
  },
  { ssr: false },
);

export default forwardRef<Object, EditorProps>(
  function RichTextEditor(props, ref) {
    return (
      <Editor
        {...props}
        editorClassName={cn(
          "border rounded-md px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring2 focus-within:ring-ring focus-within:ring-offset-2",
          props.editorClassName,
        )}
        toolbar={{
          options: ["inline", "list", "link", "history"],
          inline: {
            options: ["bold", "italic", "underline"],
          },
        }}
        editorRef={(r) => {
          if (typeof ref === "function") {
            ref(r);
          } else if (ref) {
            ref.current = r;
          }
        }}
      />
    );
  },
);
