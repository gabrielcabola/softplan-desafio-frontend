import React from 'react';

function List({ name, keyword, listInDetailMode, children, type = 'button' }) {


  let list;
  let detail;

  let columnSize = 'column-18';
  let columnSizeDetail = 'column-12 p-l-0 p-r-0';

    if(children[0]) {
      if(listInDetailMode) columnSize = 'column-9';

      list = <div className={columnSize}>
                  <ul className='List'>
                  {children[0]}
                  </ul>
              </div>;
    }

    if(listInDetailMode) {
      if(! children[0]) columnSizeDetail = 'column-19 p-l-0 p-r-0';
      detail = <div className={columnSizeDetail}>
        {children[1]}
      </div>;
    }

    return (
        <div className="row">
          <div className="column-3"></div>
          {list}
          {detail}
      </div>
    );




}

export default List;
