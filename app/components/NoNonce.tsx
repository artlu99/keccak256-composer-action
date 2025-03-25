const NoNonce = () => {
	return (
		<div className="flex justify-center">
			<h2 className="text-xl text-warning">
				This form can only be called via the official Composer Actions
			</h2>
			<p className="text-sm italic my-5 text-accent">
				Sorry, not sorry. Beep boop 🤖
			</p>
		</div>
	);
};

export default NoNonce;
