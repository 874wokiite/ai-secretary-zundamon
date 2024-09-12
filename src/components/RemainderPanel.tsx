import { ZundamonImage } from "@/components/ZundamonImage";
import type { EventType } from "@/types/EventType";

export const RemainderPanel = ({ event }: { event: EventType }) => {
  return (
    <div className="relative flex flex-row justify-start">
      <div className="absolute z-[70] flex items-center justify-center py-2 px-4 border top-[100px] border-black bg-white rounded-xl h-fit w-[240px]">
        <p className="text-base text-black">
          {event.eventName}がもうすぐ始まるのだ!!
        </p>
      </div>
      <ZundamonImage variant="order" className="ml-[160px]" />
    </div>
  );
};
