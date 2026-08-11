import { asset } from "@/lib/asset";
import Image from "next/image";

export default function Loading({
  show = false,
  animate = true,
}: {
  show?: boolean;
  animate?: boolean;
}) {
  if (!show) return null;

  return (
    <div
      className={`loading transition-all transform ${
        animate ? "animate-bounce-in" : "animate-bounce-out"
      }`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Image
        className="animate-spin-slow"
        src={asset("/assets/images/oreo.png")}
        alt=""
        width={160}
        height={160}
        priority
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}
