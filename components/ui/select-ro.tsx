import { forwardRef, HTMLProps } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export default forwardRef<HTMLSelectElement, HTMLProps<HTMLSelectElement>>(
  function SelectRO({ className, ...props }, ref) {
    return (
      <div className="relative">
        <select
          className={cn(
            "disabled-opacity-50 z-10 h-10 w-full cursor-pointer truncate rounded-md border border-input bg-background py-2 pl-3 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed",
            className,
          )}
          ref={ref}
          {...props}
        />
        {/* <ChevronDown className="absolute right-3 top-3 z-0 h-4 w-4 cursor-pointer opacity-50" /> */}
      </div>
    );
  },
);
