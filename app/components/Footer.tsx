const Footer = () => {
	return (
		<>
			<h2 className="">
				visit{" "}
				<a href="https://SassyHash.artlu.xyz" target="_blank" rel="noreferrer">
					SassyHash
					<span className="opacity-50">.artlu.xyz</span>
					&nbsp;
				</a>
				to:
			</h2>
			<div className="flex flex-col mx-5 text-sm">
				<ul className="list-disc">
					<li>
						<p>
							<a
								href="https://sassyhash.artlu.xyz/download"
								target="_blank"
								rel="noreferrer"
							>
								download your own history
							</a>
						</p>
					</li>
					<li>
						<p>
							<a
								href="https://sassyhash.artlu.xyz/channels"
								target="_blank"
								rel="noreferrer"
							>
								see all enabled channels
							</a>
						</p>
					</li>
				</ul>
			</div>
			<h2 className="">
				use the{" "}
				<a
					href="https://warpcast.com/~/add-cast-action?url=https%3A%2F%2Fkeccak256-composer-action.artlu.workers.dev%2Fcast-action"
					target="_blank"
					rel="noreferrer"
				>
					cast action&nbsp;
				</a>
				to:
			</h2>
			<div className="flex flex-col mx-5 text-sm">
				<ul className="list-disc">
					<li>
						<p>decode messages with permission</p>
					</li>
					<li>
						<p>opt-in your channels to decode messages</p>
					</li>
				</ul>
			</div>
			<p className="text-xs my-5">
				Independent calculation:{" "}
				<a
					href="https://emn178.github.io/online-tools/keccak_256.html"
					target="_blank"
					rel="noreferrer"
				>
					https://emn178.github.io/online-tools/keccak_256.html
				</a>
			</p>
			<p className="text-xs">
				FOSS Repo:{" "}
				<a
					href="https://github.com/artlu99/keccak256-composer-action"
					target="_blank"
					rel="noreferrer"
				>
					https://github.com/artlu99/keccak256-composer-action
				</a>
			</p>
		</>
	);
};

export default Footer;
