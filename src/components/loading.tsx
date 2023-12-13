import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <Image
        className="animate-spin-slow"
        src="/assets/images/oreo.png"
        alt="loading"
        width={64}
        height={64}
      />
    </div>
  );
};

export default Loading;
