
const LogoSvg = () => {
  return (
    <svg
      width="256"
      height="256"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2fb34a" />
          <stop offset="100%" stop-color="#1e5fbf" />
        </linearGradient>
      </defs>

      <circle cx="256" cy="256" r="250" fill="url(#logoGradient)" />

      <path
        d="M110 190
       C160 110 220 120 256 160
       C292 120 352 110 402 190"
        fill="none"
        stroke="white"
        stroke-width="40"
        stroke-linecap="round"
      />

      <rect x="236" y="160" width="40" height="220" rx="20" fill="white" />

      <path
        d="M160 330
       C200 420 312 420 352 330"
        fill="none"
        stroke="white"
        stroke-width="40"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default LogoSvg;
