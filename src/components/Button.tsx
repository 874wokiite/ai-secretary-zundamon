import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/utils/shadcn";

const buttonVariants = cva(
  "flex flex-row w-fit justify-center items-center rounded-[4px] font-bold",
  {
    variants: {
      variant: {
        primary:
          "bg-zunda-primary text-zunda-black text-zunda-body border-zunda-black shadow-[0_2px_0_0_black] transition-all ease-in-out hover:translate-y-[2px] hover:shadow-none",
        secondary:
          "bg-zunda-white text-zunda-black text-zunda-caption border-zunda-black shadow-[0_2px_0_0_black] transition-all ease-in-out hover:translate-y-[2px] hover:shadow-none",
        text: "text-zunda-primary text-zunda-caption border-none",
      },
      size: {
        default: "text-zunda-body px-[16px] py-[8px] gap-[8px] border-[2px]",
        small: "text-zunda-caption px-[8px] py-[4px] gap-[4px] border-[1px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
