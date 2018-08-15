import React, { Component } from 'react';
import ReactDom from 'react-dom';

function Button({ children, onClick, type = 'button' }) {
  return (
    <button type={type} className='btn' onClick={onClick} >
      {children}
    </button>
  );
}

ReactDOM.render(
  <Button onClick={() => console.log('You just clicked')} >
    Example
  </Button>,
  document.getElementById('root')
);
