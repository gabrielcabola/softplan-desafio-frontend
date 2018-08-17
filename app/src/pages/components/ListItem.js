import React from 'react';
import Label from './Label';


const ListItem = ({  processo, selected, compact, className='List-item', onClick }) => {

  if(processo.selected) {
    className = 'List-item List-item--selected';
  }
  let plusInteressados;
  if(processo.interessados.length > 1)  plusInteressados = '(+ ' + (processo.interessados.length - 1) + ')'; ;

  if(compact) {
    return (
      <li className={className} onClick={onClick}>
        <Label title="Número" className="column-12 p-0" compact="true">{processo.numero}</Label>
        <Label title="Assunto" className="column-12 p-0" compact="true">{processo.assunto}</Label>
        <Label title="Interessado" className="column-24 p-0 p-t-5" compact="true">{processo.interessados[0]}</Label>
      </li>
    );
  } else {
    className='List-item p-0';
    return (
      <li className={className} onClick={onClick}>

        <div className="column-2 ">
          <div className="Thumb hide-handhelds">{processo.thumb}</div>
        </div>
        <Label title="Número" className="column-5 p-l-20 ">{processo.numero}</Label>
        <Label title="Interessado"  className="column-5 ">{processo.interessados[0]} {plusInteressados}</Label>
        <Label title="Descrição"  className="column-6 ">{processo.descricao}</Label>
        <Label title="Assunto"  className="column-6 ">{processo.assunto}</Label>
      </li>
    );
  }

}

export default ListItem;
