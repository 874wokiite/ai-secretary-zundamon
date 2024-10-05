import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex flex-row justify-center items-center rounded-[4px] font-bold",
  {
    variants: {
      variant: {
        primary: "bg-zunda-primary-light text-zunda-black border-zunda-black",
        secondary: "bg-zunda-white text-zunda-black border-zunda-black",
        text: "bg-zunda-white text-zunda-primary-dark border-none",
      },
      size: {
        default: "text-zunda-body px-[16px] py-[8px] gap-[8px] border-[2px]",
        small: "text-zunda-caption px-[8px] py-[6px] gap-[4px] border-[1px]",
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
