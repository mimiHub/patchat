// src/components/icons/IconNewChat.jsx
function IconNewChat({ size = 20, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13 11H15.5V13H13V15.5H11V13H8.5V11H11V8.5H13V11Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.25709 18.3287C2.84708 16.6053 2 14.4009 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22H3L2.29289 20.2929L4.25709 18.3287ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20H5.41421L8.70711 16.7071L7.29289 15.2929L5.68009 16.9057C4.62644 15.5506 4 13.8491 4 12Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default IconNewChat;
