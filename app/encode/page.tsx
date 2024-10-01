"use client";

import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import keccak256 from "keccak256";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { processSubmission } from "../actions";

const WHISTLES_ENDPOINT = "https://yoga-whistles.artlu.workers.dev/graphql";
const WHISTLES_QUERY = gql`
  query GetWhistles($fid: Int) {
    heartbeat
    isPrePermissionless(fid: $fid)
  }
`;
interface Whistles {
  heartbeat: boolean;
  isPrePermissionless?: boolean;
}

export default function Page() {
  const searchParams = useSearchParams();
  const fidParam = searchParams.get("fid"); // this is easily spoofed
  const fid = fidParam ? parseInt(fidParam) : undefined;
  const timestamp = searchParams.get("timestamp") ?? undefined;
  const messageHash = searchParams.get("messageHash") ?? undefined;
  const text = searchParams.get("text") ?? "";

  const [whistles, setWhistles] = useState<Whistles>({ heartbeat: false });
  const [rawText, setRawText] = useState(text);
  const [outputForm, setOutputForm] = useState("");
  const [isDisabledComposeButton, setIsDisabledComposeButton] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);

  const { data } = useQuery<Whistles, Error>({
    queryKey: ["whistles-query"],
    queryFn: () =>
      request<Whistles>(WHISTLES_ENDPOINT, WHISTLES_QUERY, { fid }),
  });

  useEffect(() => {
    if (data) {
      setWhistles(data);
    }
  }, [data]);

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
    <div className="artboard phone-1">
      <div className="card w-96 bg-base-100">
        <div className="card-body">
          <div className="flex justify-end">
            <h2>
              {whistles.heartbeat && "💜"} FID: {fid}
              {whistles?.isPrePermissionless && "✨"}
            </h2>
          </div>

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
            <p
              id="privateBlurb"
              className="text-sm italic my-5"
              hidden={!isPrivate}
            >
              Compose button sends blank metadata to the Composer Action server,
              using client-side Javascript (React).
            </p>
            <p
              id="storedBlurb"
              className="text-sm italic my-5"
              hidden={isPrivate}
            >
              Compose button securely sends plaintext and metadata to the
              Composer Action server. It is always stored encrypted-at-rest.
            </p>
            <input type="hidden" name="fid" value={isPrivate ? 0 : fid} />
            <input
              type="hidden"
              name="timestamp"
              value={isPrivate ? 0 : timestamp}
            />
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
          <h1 className="text-2xl">🔜</h1>
          <div className="flex flex-col mx-5 text-sm">
            <ul className="list-disc">
              <li>
                <p>
                  self-sovereign gated access to unencrypted message content
                </p>
              </li>
            </ul>
          </div>
          <p className="text-xs my-5">
            Independent calculation:
            https://emn178.github.io/online-tools/keccak_256.html
          </p>
        </div>
      </div>
    </div>
  );
}
