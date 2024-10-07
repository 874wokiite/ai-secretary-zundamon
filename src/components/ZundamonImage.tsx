import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import ZundamonDefaultImage from "data-base64:@/assets/images/zundamon/default.png";
import ZundamonGreetImage from "data-base64:@/assets/images/zundamon/greet.png";
import ZundamonKomariImage from "data-base64:@/assets/images/zundamon/komari.png";
import ZundamonOrderImage from "data-base64:@/assets/images/zundamon/order.png";
import ZundamonThinkImage from "data-base64:@/assets/images/zundamon/think.png";
import ZundamonYattaImage from "data-base64:@/assets/images/zundamon/yatta.png";
import React from "react";

import { cn } from "@/utils/shadcn";

export type ZundamonImageVariant =
  | "default"
  | "greet"
  | "komari"
  | "order"
  | "think"
  | "yatta";

export interface ZundamonImageProps {
  variant: ZundamonImageVariant;
  className?: string;
}

const imageMap: Record<ZundamonImageVariant, string> = {
  default: ZundamonDefaultImage,
  greet: ZundamonGreetImage,
  komari: ZundamonKomariImage,
  order: ZundamonOrderImage,
  think: ZundamonThinkImage,
  yatta: ZundamonYattaImage,
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
