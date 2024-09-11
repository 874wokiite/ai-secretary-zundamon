import { ZundamonImage } from "@/components/ZundamonImage";
import cssText from "data-text:@/styles/global.css";

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;

  return style;
};

function ContentUI() {
  return (
    <div className="z-50 fixed bottom-[-160px] right-[-40px]">
      <ZundamonImage />
    </div>
  );
}

export default ContentUI;
