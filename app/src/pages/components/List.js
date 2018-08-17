import React from 'react';
import Grid from '@material-ui/core/Grid';

function List({ name, keyword, listInDetailMode, children, type = 'button' }) {

  let list;
  let detail;
  let columnSize = 10;
  let columnSizeDetail = 5;


    /**
     * Caso tenha Lista de Busca
     * Só não tem lista na busca quando o processo tiver uma página interna
     */
    if(children[0]) {
      if(listInDetailMode) columnSize = 6;
      list = <ul className='List'>
              {children[0]}
             </ul>;
    }

    /**
     * Caso exista um processo em detalhe
     */
    if(listInDetailMode) {
      if(! children[0]) columnSizeDetail = 10;
      detail =  <Grid item xs={12} sm={columnSizeDetail+1} md={columnSizeDetail} className="p-l-0"> {children[1]} </Grid>;
    }

    //Render
    return (
      <Grid container spacing={24}>
         <Grid item xs={12} sm={0} md={1}></Grid>
          <Grid item xs={12} sm={columnSize} md={columnSize}>
            {list}
          </Grid>
          {detail}
      </Grid>
    );




}

export default List;
