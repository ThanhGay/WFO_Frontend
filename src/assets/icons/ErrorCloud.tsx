import * as React from 'react';
const ErrorCloudIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={90}
    height={90}
    fill="none"
    {...props}
  >
    <path fill="url(#a)" d="M0 0h90v90H0z" />
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#b" transform="scale(.01111)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={90}
        height={90}
      />
    </defs>
  </svg>
);
export default ErrorCloudIcon;
