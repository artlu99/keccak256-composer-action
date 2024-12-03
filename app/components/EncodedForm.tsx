import { processSubmission } from "@/app/actions";
import Footer from "@/app/components/Footer";
import {
  ANONCAST_FID,
  MUTE_PHRASE,
  RAWANON_FID,
  SUPERANON_FID,
} from "@/app/constants";
import keccak256 from "keccak256";
import { useState } from "react";

interface EncodeFormProps {
  text: string;
  fid?: number;
  timestamp?: string;
  messageHash?: string;
  nonce?: string;
}
const EncodeForm = ({
  text,
  fid,
  timestamp,
  messageHash,
  nonce,
}: EncodeFormProps) => {
  const [rawText, setRawText] = useState(text);
  const [outputForm, setOutputForm] = useState("");
  const [isDisabledComposeButton, setIsDisabledComposeButton] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);
  const [postToSuperanon, setPostToSuperanon] = useState(false);
  const [postToAnoncast, setPostToAnoncast] = useState(false);
  const [includeMutePhrase, setIncludeMutePhrase] = useState(true);

  const handleRawTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newRawText = event.target.value;
    const newEncodedText = keccak256(newRawText).toString("hex");
    setRawText(newRawText);
    setOutputForm(newEncodedText);
    setIsDisabledComposeButton(false);
  };

  const handleButtonClick = (rawText: string, includeMutePhrase: boolean) => {
    const text =
      keccak256(rawText).toString("hex") +
      (includeMutePhrase ? `\n\n${MUTE_PHRASE}` : "");
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
      <div
        id="privateBlurb"
        className="text-sm italic my-5"
        hidden={!isPrivate}
      >
        The server will not be able to decode, unless it already knows the code
        by other means.
        <div className="font-bold text-error">
          Are you sure? Be sure before hitting Compose.
        </div>
      </div>
      <p id="storedBlurb" className="text-sm italic my-5" hidden={isPrivate}>
        Compose button securely sends plaintext and metadata to the Composer
        Action server. It is always stored encrypted-at-rest.
      </p>
      <input type="hidden" name="nonce" value={nonce} />
      <input type="hidden" name="fid" value={isPrivate ? 0 : fid} />
      <input
        type="hidden"
        name="fid2"
        value={postToSuperanon ? SUPERANON_FID : 0}
      />
      <input
        type="hidden"
        name="fid3"
        value={postToAnoncast ? RAWANON_FID : 0}
      />
      <input
        type="hidden"
        name="fid4"
        value={postToAnoncast ? ANONCAST_FID : 0}
      />
      <input type="hidden" name="timestamp" value={isPrivate ? 0 : timestamp} />
      <input
        type="hidden"
        name="messageHash"
        value={isPrivate ? "" : messageHash}
      />
      <input
        type="hidden"
        name="hashedText"
        value={isPrivate ? "" : outputForm}
      />
      <div
        className="textarea textarea-bordered my-5 text-xs overflow-x-auto"
        id="outputForm"
      >
        {outputForm}
      </div>
      <div className="flex justify-center">
        <button
          className="btn btn-wide btn-primary"
          disabled={isDisabledComposeButton}
          type="submit"
          id="composeButton"
          onClick={() => handleButtonClick(rawText, includeMutePhrase)}
        >
          Compose
        </button>
      </div>
      <div className="flex justify-end my-2 mx-8">
        <span className="text-sm italic mx-2">optional Mute phrase</span>
        <input
          type="checkbox"
          id="mutePhrase"
          className="toggle"
          checked={includeMutePhrase}
          onChange={(event) => setIncludeMutePhrase(event.target.checked)}
        />
      </div>

      <div className="flex justify-center my-4">
        <div className="join active:btn-neutral">
          <input
            className="join-item btn btn-outline"
            type="checkbox"
            id="superanon"
            checked={postToSuperanon}
            onChange={(event) => setPostToSuperanon(event.target.checked)}
            aria-label="superanon"
          />
          <input
            className="join-item btn btn-outline active:btn-neutral"
            type="checkbox"
            id="rawanon | anoncast"
            checked={postToAnoncast}
            onChange={(event) => setPostToAnoncast(event.target.checked)}
            aria-label="rawanon | anoncast"
          />
        </div>
      </div>

      <Footer />
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
