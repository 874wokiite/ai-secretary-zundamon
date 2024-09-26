import { ZundamonImage } from "@/components/ZundamonImage";
import type { EventType } from "@/types/EventType";

export const RemainderPanel = ({ event }: { event: EventType }) => {
  return (
    <div className="relative flex flex-row justify-start">
      <div className="absolute top-[100px] z-30 flex h-fit w-[240px] items-center justify-center rounded-xl border border-black bg-white px-4 py-2">
        <p className="text-base text-black">
          {event.name}がもうすぐ始まるのだ!!
        </p>
      </div>
      <ZundamonImage variant="order" className="ml-[160px]" />
    </div>
  );
};
