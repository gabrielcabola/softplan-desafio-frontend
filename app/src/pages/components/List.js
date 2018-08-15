import React from 'react';


function List({ name, listInDetailMode, children, type = 'button' }) {


  if(listInDetailMode)
  {

    return (
        <div className="row">
          <div className="column-3"></div>
          <div className="column-9">
              <ul className='List'>
              {children}
              </ul>
          </div>
      </div>
    );

  } else  {

    return (
        <div className="row">
          <div className="column-3"></div>
          <div className="column-18">
              <ul className='List'>
              {children}
              </ul>
          </div>
      </div>
    );

  }


}

export default List;
