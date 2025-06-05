const RedirectInstruction = () => {
	const currentYear = new Date().getFullYear();
	return (
		<div className="flex flex-col justify-center">
			<h2 className="text-xl text-warning">
				It's {currentYear}, fam.
				<br />
				Time to use
				<br />🐟 Snappa Mini App
			</h2>
			<br />
			<p className="text-sm italic my-5 text-accent">
				<a
					href="https://farcaster.xyz/miniapps/zTVU_TOaKbz1/snappa--"
					target="_blank"
					rel="noopener noreferrer"
				>
					https://farcaster.xyz/miniapps/zTVU_TOaKbz1/snappa--
				</a>
			</p>
		</div>
	);
};

export default RedirectInstruction;
