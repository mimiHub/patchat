// src/components/icons/IconPin.jsx
function IconPin({ size = 14, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#icon-pin-clip)">
        <path
          d="M10.1232 0.0340729L8.00675 2.15058V14.6932H6.11678L4.00293 16.8097V23.245L6.11678 25.3615H25.8835L28 23.245V16.8097L25.8835 14.6932H23.9962V2.15058L21.89 0.0340729H10.1232ZM11.2244 2.6998H20.7785L21.3278 3.25176V17.3615H24.7823L25.3342 17.9109V22.1438L24.7823 22.693H7.22058L6.66866 22.1438V17.9109L7.22058 17.3615H10.6725V3.25176L11.2244 2.6998Z"
          fill="currentColor"
        />
        <path
          d="M14.6679 22.6937V24.0319V30.693V32.0213H17.3343V30.693V24.0319V22.6937H14.6679Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="icon-pin-clip">
          <rect width="32.0013" height="32.0013" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default IconPin;
