import { AspectRatio } from "@/components/ui/aspect-ratio"
import ZundamonClickedImage from "data-base64:@/assets/images/zundamon-clicked.png"
import ZundamonNormalImage from "data-base64:@/assets/images/zundamon-normal.png"
import cssText from "data-text:@/styles/global.css"
import { useEffect, useState } from "react"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText

  return style
}

const ZundamonImage = () => {
  const [imageSrc, setImageSrc] = useState(ZundamonNormalImage)
  var sound = new Audio(
    chrome.runtime.getURL("assets/sounds/zundamon-greet.wav")
  )

  useEffect(() => {
    if (imageSrc === ZundamonClickedImage) {
      const timer = setTimeout(() => {
        setImageSrc(ZundamonNormalImage)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [imageSrc])

  const clickEventHandler = () => {
    setImageSrc(ZundamonClickedImage)
    sound.play()
  }

  return (
    <div
      className="z-50 fixed bottom-[-160px] right-[-40px] w-[360px] hover:cursor-pointer"
      onClick={clickEventHandler}>
      <AspectRatio ratio={2 / 3}>
        <img
          className="object-cover select-none pointer-events-none"
          src={imageSrc}
          alt="ずんだもんの画像"
        />
      </AspectRatio>
    </div>
  )
}

export default ZundamonImage
