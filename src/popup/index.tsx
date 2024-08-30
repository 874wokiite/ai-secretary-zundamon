import IconImage from "data-base64:@/assets/icon.png"

import "@/styles/global.css"

function IndexPopup() {
  return (
    <div className="flex flex-col items-center justify-center h-[80px] w-[400px]">
      <img className="w-[40px] h-[40px]" src={IconImage} alt="icon" />
      <h1 className="text-xl">AI Securetary Zundamon!!</h1>
    </div>
  )
}

export default IndexPopup
