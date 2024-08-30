import { AspectRatio } from "@/components/ui/aspect-ratio"
import ZundaImage from "data-base64:@/assets/zundamon-1.png"
import cssText from "data-text:@/styles/global.css"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const ZundamonImage = () => {
  return (
    <div className="z-50 flex fixed bottom-[-160px] right-[-40px] w-[360px]">
      <AspectRatio ratio={541 / 825}>
        <img
          className="object-cover select-none pointer-events-none"
          src={ZundaImage}
          alt="ずんだもんの画像"
        />
      </AspectRatio>
    </div>
  )
}

export default ZundamonImage
