import Image from "next/image";

export default function Loading({
  show = false,
  animate = true,
}: {
  show?: boolean;
  animate?: boolean;
}) {
  return (
    show && (
      <div
        className={`loading transition-all transform ${
          animate ? `animate-bounce-in` : `animate-bounce-out`
        }`}
      >
        <Image
          className="animate-spin-slow"
          src="/assets/images/oreo.png"
          alt="loading"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "10rem",
            height: "10rem",
          }}
        />
      </div>
    )
  );
}
