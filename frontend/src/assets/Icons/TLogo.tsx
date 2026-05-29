const TShape = ({ color = "#1e4fff", size = 200 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path
      d="M500 120
         C460 350 250 330 200 330
         C260 360 350 430 480 430
         L480 780
         C480 820 520 820 520 780
         L520 430
         C650 430 740 360 800 330
         C750 330 540 350 500 120
        "
      fill={color}
    />
  </svg>
);
export default TShape;
