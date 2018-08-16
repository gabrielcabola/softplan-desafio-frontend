import React from 'react';


function Loading({ children }) {
  return (
    <div className="Aligner">
      <div className="Aligner-item p-100">
          <center>
          <p>Carregando ...</p>
          </center>
       </div>
     </div>
  );
}

export default Loading;
