const Footer = () => {
  return (
    <>
      <h1 className="text-2xl">🔜</h1>
      <div className="flex flex-col mx-5 text-sm">
        <ul className="list-disc">
          <li>
            <p>download your own history</p>
          </li>
          <li>
            <p>opt-in your channels to decoded messages</p>
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
