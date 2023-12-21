type ResultProps = {
  back: () => void;
  result: OreoKey[];
};

export default function Result({ back, result }: ResultProps) {
  return <div className="card result">Result</div>;
}
