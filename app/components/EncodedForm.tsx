import keccak256 from "keccak256";
import { useState } from "react";
import { processSubmission } from "../actions";

interface EncodeFormProps {
  text: string;
  fid?: number;
  timestamp?: string;
  messageHash?: string;
}
const EncodeForm = ({ text, fid, timestamp, messageHash }: EncodeFormProps) => {
  const [rawText, setRawText] = useState(text);
  const [outputForm, setOutputForm] = useState("");
  const [isDisabledComposeButton, setIsDisabledComposeButton] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleRawTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newRawText = event.target.value;
    const newEncodedText = keccak256(newRawText).toString("hex");
    setRawText(newRawText);
    setOutputForm(newEncodedText);
    setIsDisabledComposeButton(false);
  };

  const handleButtonClick = (rawText: string) => {
    const text = keccak256(rawText).toString("hex");
    window.parent.postMessage(
      { type: "createCast", data: { cast: { text, embeds: [] } } },
      "*"
    );
  };

  return (
    <form action={processSubmission}>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Unencrypted text:</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          id="rawText"
          name="rawText"
          value={rawText}
          maxLength={320}
          required
          onChange={handleRawTextChange}
        />
        <div className="label">
          <span className="label-text-alt">max 320 chars</span>
          <span className="label-text-alt">no mentions or embeds</span>
        </div>
      </label>
      <p id="privateBlurb" className="text-sm italic my-5" hidden={!isPrivate}>
        Compose button sends blank metadata to the Composer Action server, using
        client-side Javascript (React).
      </p>
      <p id="storedBlurb" className="text-sm italic my-5" hidden={isPrivate}>
        Compose button securely sends plaintext and metadata to the Composer
        Action server. It is always stored encrypted-at-rest.
      </p>
      <input type="hidden" name="fid" value={isPrivate ? 0 : fid} />
      <input type="hidden" name="timestamp" value={isPrivate ? 0 : timestamp} />
      <input
        type="hidden"
        name="messageHash"
        value={isPrivate ? "" : messageHash}
      />
      <div
        className="textarea textarea-bordered my-5 text-xs overflow-x-auto"
        id="outputForm"
      >
        {outputForm}
      </div>
      <div className="flex justify-center">
        <button
          className="btn btn-wide"
          disabled={isDisabledComposeButton}
          type="submit"
          id="composeButton"
          onClick={() => handleButtonClick(rawText)}
        >
          Compose
        </button>
      </div>
      <div className="flex justify-end my-2 mx-8">
        <span className="text-sm italic mx-2">Private</span>
        <input
          type="checkbox"
          id="discard"
          className="toggle"
          checked={isPrivate}
          onChange={(event) => setIsPrivate(event.target.checked)}
        />
      </div>
    </form>
  );
};

export default EncodeForm;