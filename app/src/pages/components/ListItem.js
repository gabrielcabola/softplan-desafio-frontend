import React from 'react';
import Label from './Label';

function ListItem({ key, processo, selected, compact, className, onClick }) {
  console.log(processo);

  if(compact) {
    return (
      <li className='List-item' onClick={onClick}>
        <Label title="Número" className="column-12 p-0" compact="true">{processo.numero}</Label>
        <Label title="Assunto" className="column-12 p-0" compact="true">{processo.assunto}</Label>
        <Label title="Interessado" className="column-24 p-0" compact="true">{processo.interessados}</Label>
      </li>
    );
  } else {
    return (
      <li className='List-item' onClick={onClick}>
        <div className="Thumb column-2">{processo.thumb}</div>
        <Label title="Número" className="column-5 p-l-20">{processo.numero}</Label>
        <Label title="Interessado"  className="column-5 ">{processo.interessados}</Label>
        <Label title="Descrição"  className="column-6 ">{processo.descricao}</Label>
        <Label title="Assunto"  className="column-6 ">{processo.assunto}</Label>
      </li>
    );
  }

}

export default ListItem;
