const Footer = () => {
  return (
    <>
      <h1 className="text-2xl">🔜</h1>
      <div className="flex flex-col mx-5 text-sm">
        <ul className="list-disc">
          <li>
            <p>self-sovereign gated access to unencrypted message content</p>
          </li>
        </ul>
      </div>
      <p className="text-xs my-5">
        Independent calculation:
        https://emn178.github.io/online-tools/keccak_256.html
      </p>
    </>
  );
};

export default Footer;
