import React from 'react';

function ListItem({ title, children, className }) {

  return (
    <div className={className}>
      <div className="Label-title">{title}</div>
      <div className="Label-value">{children}</div>
    </div>
  );
}

export default ListItem;
