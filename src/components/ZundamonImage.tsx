import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import ZundamonGreetImage from "data-base64:@/assets/images/zundamon/greet.png";
import ZundamonOrderImage from "data-base64:@/assets/images/zundamon/order.png";
import ZundamonThinkImage from "data-base64:@/assets/images/zundamon/think.png";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export type ZundamonVariantType = "greet" | "order" | "think";

export const ZundamonImage = ({
  variant,
  className,
}: {
  variant: ZundamonVariantType;
  className?: string;
}) => {
  const imageSrc = useMemo(() => {
    switch (variant) {
      case "greet":
        return ZundamonGreetImage;
      case "order":
        return ZundamonOrderImage;
      case "think":
        return ZundamonThinkImage;
    }
  }, [variant]);

  return (
    <div className={twMerge("h-[600px] w-[400px]", className)}>
      <AspectRatio.Root ratio={2 / 3}>
        <img
          className="pointer-events-none select-none object-cover"
          src={imageSrc}
          alt="ずんだもんの画像"
        />
      </AspectRatio.Root>
    </div>
  );
};
