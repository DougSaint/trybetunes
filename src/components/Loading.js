import React from 'react';

function Loading() {
  return (
  /* Animation loading overlay */

    <div className="loading">
      <div className="loading__overlay">
        <div className="loading__overlay__content">
          <div className="loading__overlay__content__spinner" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
