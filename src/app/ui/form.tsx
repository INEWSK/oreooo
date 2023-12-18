import { FaRandom } from "react-icons/fa";

export default function Form({ submit }: { submit: () => void }) {
  return (
    <div className="container">
      <div className="form">
        <label className="title">{`I would like: `}</label>
        <div className="input-box">
          <input type="text" id="oreo-input" placeholder="Oreo..." readOnly />
          <span className="trailing">
            <FaRandom />
          </span>
        </div>
        <div className="control">
          <div className="btn">O</div>
          <div className="btn">R</div>
          <div className="btn">and</div>
          <div className="btn">-1</div>
        </div>
      </div>
      <button className="submit-btn" type="button" onClick={() => submit()}>
        Generate
      </button>
    </div>
  );
}
