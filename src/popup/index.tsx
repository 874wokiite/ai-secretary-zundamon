import "@/styles/global.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ZundamonNormalImage from "data-base64:@/assets/images/zundamon-normal.png";

function Popup() {
  return (
    <div className="flex relative flex-col items-center justify-center h-[560px] w-[800px]">
      <div className="z-50 absolute bottom-[40px] right-[8px]">
        <div className="w-[240px]">
          <AspectRatio ratio={2 / 3}>
            <img
              className="object-cover select-none pointer-events-none"
              src={ZundamonNormalImage}
              alt="ずんだもんの画像"
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}

export default Popup;
