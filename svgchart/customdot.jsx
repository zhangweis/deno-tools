import React from 'https://esm.sh/react';
function CustomDot(props){
    const { cx, cy, r, className, payload } = props;
return (
        <circle 
          className={className}
          cx={cx}
          cy={cy}
          r={r}
        >
            {props.children}
        </circle>
        );
  }
export {CustomDot};
