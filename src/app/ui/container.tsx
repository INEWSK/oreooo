import Form from "./form";

export default function Container({
  onSubmit,
  onReset,
}: {
  onSubmit: () => void;
  onReset: () => void;
}) {
  return (
    <div className="main">
      <Form submit={onSubmit} />
      {/* <Result reset={onReset} /> */}
    </div>
  );
}
