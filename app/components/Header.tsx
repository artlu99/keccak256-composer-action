interface HeaderProps {
	fid: number | undefined;
	heartbeat: boolean;
	isPrePermissionless?: boolean;
}
const Header = (props: HeaderProps) => {
	const { fid, heartbeat, isPrePermissionless } = props;

	return (
		<div className="flex justify-end">
			<h2>
				{heartbeat && "💜"} FID: {fid}
				{isPrePermissionless && "✨"}
			</h2>
		</div>
	);
};

export default Header;
