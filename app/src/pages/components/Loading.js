import React from 'react';


function Loading({ children }) {
  return (
    <div className="Aligner">
      <div className="Aligner-item">
          <center>
          <p>Carregando ...</p>
          </center>
       </div>
     </div>
  );
}

export default Loading;
