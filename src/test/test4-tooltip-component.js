import React, { useState } from 'react';

function Tooltip({ children, text }) {
  // const [showTooltip, setShowTooltip] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const lines = text.split('\n');
  return (
    <div 
      onMouseOver={() => setShowTooltip(true)}
      onMouseOut={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div 
          style={{
            position: 'absolute',
            top: '10px',        // umieść na środku (w pionie) względem elementu
            left: '0px',      // umieść po prawej stronie elementu
            marginLeft: '10px', // dodaj trochę odstępu od elementu
            backgroundColor: 'black',
            color: 'white',
            padding: '5px',
            borderRadius: '5px',
            width: '300px',
            textAlign: 'center'
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
