import ZundaImage from "data-base64:@/assets/zundamon-1.png"
import cssText from "data-text:@/style.css"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return (
    <div className="z-50 flex fixed bottom-[-1024px] right-[-240px]">
      <img src={ZundaImage} alt="ずんだもんの画像" />
    </div>
  )
}

export default PlasmoOverlay
