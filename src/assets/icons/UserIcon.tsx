import * as React from 'react';
const UserIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={18}
    fill="none"
    {...props}
  >
    <path
      stroke="#FB6F3D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M14.236 16.643v-1.805c0-.957-.339-1.875-.94-2.552-.603-.677-1.42-1.057-2.271-1.057H4.603c-.852 0-1.669.38-2.271 1.057-.602.677-.94 1.595-.94 2.553v1.804M7.814 7.98c1.773 0 3.21-1.455 3.21-3.25 0-1.794-1.437-3.248-3.21-3.248-1.774 0-3.211 1.454-3.211 3.249 0 1.794 1.437 3.249 3.21 3.249Z"
    />
  </svg>
);
export default UserIcon;
