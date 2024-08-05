import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

const H1 = (props: HTMLProps<HTMLHeadingElement>) => {
  return (
    <h1
      {...props}
      className={cn(
        "text-4xl font-semibold tracking-tight lg:text-5xl",
        props.className,
      )}
    />
  );
};

export default H1;
