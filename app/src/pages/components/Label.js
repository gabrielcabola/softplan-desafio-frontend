import React from 'react';

function ListItem({ title, children, classTitle  = "Label-title", classValue  = "Label-value", className }) {

  return (
    <div className={className}>
      <div className={classTitle}>{title}</div>
      <div className={classValue}>{children}</div>
    </div>
  );
}

export default ListItem;
