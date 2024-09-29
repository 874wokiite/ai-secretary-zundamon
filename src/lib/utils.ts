import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  override: {
    classGroups: {
      "font-size": [
        "text-zunda-t1",
        "text-zunda-t2",
        "text-zunda-body",
        "text-zunda-caption",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
