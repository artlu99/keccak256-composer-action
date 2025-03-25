import { processSubmission } from "@/app/actions";
import { MUTE_PHRASE } from "@/app/constants";
import keccak256 from "keccak256";
import { useEffect, useRef, useState } from "react";

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
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.focus();
			setTimeout(() => {
				textareaRef.current?.focus();
			}, 100);
		}
	}, []);

	const handleRawTextChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		const newRawText = event.target.value;
		const newEncodedText = keccak256(newRawText).toString("hex");
		setRawText(newRawText);
		setOutputForm(newEncodedText);
		setIsDisabledComposeButton(false);
	};

	const handleButtonClick = (rawText: string) => {
		const text = keccak256(rawText).toString("hex") + `\n\n${MUTE_PHRASE}`;
		window.parent.postMessage(
			{ type: "createCast", data: { cast: { text, embeds: [] } } },
			"*",
		);
	};

	return (
		<form action={processSubmission as unknown as string}>
			<label className="form-control">
				<div className="label">
					<span className="label-text">👀 IYKYK</span>
				</div>
				<textarea
					ref={textareaRef}
					className="textarea textarea-bordered h-24"
					id="rawText"
					name="rawText"
					value={rawText}
					maxLength={320}
					required
					onChange={handleRawTextChange}
					autoFocus
				/>
				<div className="label">
					<span className="label-text-alt">max 320 chars</span>
					<span className="label-text-alt">no mentions or embeds</span>
				</div>
			</label>
			<input type="hidden" name="nonce" value={nonce} />
			<input type="hidden" name="fid" value={fid} />
			<input type="hidden" name="timestamp" value={timestamp} />
			<input type="hidden" name="messageHash" value={messageHash} />
			<input type="hidden" name="hashedText" value={outputForm} />
			{outputForm.length > 0 ? (
				<>
					{" "}
					<p id="storedBlurb" className="text-sm my-5">
						SassyHash 💅
					</p>
					<div
						className="textarea textarea-bordered my-5 text-xs overflow-x-auto"
						id="outputForm"
					>
						{outputForm}
					</div>
				</>
			) : null}
			{!isDisabledComposeButton ? (
				<div className="flex justify-center">
					<button
						className="btn btn-wide btn-primary"
						disabled={isDisabledComposeButton || rawText.length === 0}
						type="submit"
						id="composeButton"
						onClick={() => handleButtonClick(rawText)}
					>
						Compose
					</button>
				</div>
			) : null}
		</form>
	);
};

export default EncodeForm;
