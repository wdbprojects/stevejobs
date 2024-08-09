import { HTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

const Markdown = ({ children }: MarkdownProps) => {
  return (
    <ReactMarkdown
      className="space-y-3"
      components={{
        ul: (props) => {
          return <ul className="list-inside list-disc" {...props} />;
        },
        a: (props) => {
          return (
            <a
              className="text-green-500 hover:underline"
              target="_blank"
              {...props}
            />
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
