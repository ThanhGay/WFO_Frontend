import * as React from 'react';
const HeartIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={15}
    fill="none"
    {...props}
  >
    <path
      stroke="#B33DFB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.15 2.338a3.945 3.945 0 0 0-2.788-1.149 3.962 3.962 0 0 0-2.789 1.149l-.76.756-.76-.756a3.955 3.955 0 0 0-2.788-1.149 3.955 3.955 0 0 0-2.789 1.149 3.91 3.91 0 0 0-1.155 2.773 3.91 3.91 0 0 0 1.155 2.773l.76.755 5.577 5.546 5.577-5.546.76-.755a3.918 3.918 0 0 0 1.156-2.773 3.9 3.9 0 0 0-1.156-2.773v0Z"
    />
  </svg>
);
export default HeartIcon;
