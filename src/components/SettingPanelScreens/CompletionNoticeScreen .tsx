import { Button } from "@/components/Button";
import { ZundamonImage } from "@/components/ZundamonImage";
import { useSetAlarms } from "@/hooks/useSetAlarms";

export const CompletionNoticeSrceen = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const { isLoading } = useSetAlarms();

  return (
    <div className="grid h-full w-full grid-cols-2">
      <div className="flex items-center justify-center">
        {isLoading === undefined || isLoading ? (
          <p className="text-xl">リマインダーをセット中...</p>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-xl">リマインダーのセットが完了したのだ!!</p>
            <Button onClick={onClose}>設定画面を閉じる!!</Button>
          </div>
        )}
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute -bottom-[160px]">
          <ZundamonImage variant={isLoading ? "think" : "order"} />
        </div>
      </div>
    </div>
  );
};
