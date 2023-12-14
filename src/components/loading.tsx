import Image from "next/image";

const Loading = ({ show = false }: { show?: boolean }) => {
  return (
    <div className="loading">
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
  );
};

export default Loading;
