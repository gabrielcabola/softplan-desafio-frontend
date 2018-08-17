import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Loading({ children }) {
  return (
    <div className="Aligner">
      <div className="Aligner-item p-100">
          <center>
          <FontAwesomeIcon  icon="spinner" color="#9e9e9e" size="3x" spin />
          </center>
       </div>
     </div>
  );
}

export default Loading;
