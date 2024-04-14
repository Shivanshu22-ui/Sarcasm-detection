import React from 'react';
import HashLoader from "react-spinners/HashLoader";

const SpinnerOverlay = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    }}>
      <div className="spinner-border" role="status">
        {/* <span className="sr-only">Loading...</span> */}
        <HashLoader color="#1f1f1f" />
      </div>
    </div>
  );
};

export default SpinnerOverlay;