import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import ZundamonGreetImage from "data-base64:@/assets/images/zundamon/greet.png";
import ZundamonOrderImage from "data-base64:@/assets/images/zundamon/order.png";
import ZundamonThinkImage from "data-base64:@/assets/images/zundamon/think.png";
import React from "react";

import { cn } from "@/lib/utils";

export type ZundamonImageVariant = "greet" | "order" | "think";

export interface ZundamonImageProps {
  variant: ZundamonImageVariant;
  className?: string;
}

const imageMap: Record<ZundamonImageVariant, string> = {
  greet: ZundamonGreetImage,
  order: ZundamonOrderImage,
  think: ZundamonThinkImage,
};

export const ZundamonImage = ({
  variant,
  className,
  ...props
}: ZundamonImageProps) => {
  return (
    <div className={cn("", className)} {...props}>
      <AspectRatio.Root ratio={541 / 825}>
        <img
          className="pointer-events-none select-none object-cover"
          src={imageMap[variant]}
          alt="ずんだもんの画像"
        />
      </AspectRatio.Root>
    </div>
  );
};
