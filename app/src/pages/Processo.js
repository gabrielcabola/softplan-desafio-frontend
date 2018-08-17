import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Loading from './components/Loading';
import Label from './components/Label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

 function Processo({ processo, interessados, index, clickClose, clickEdit, clickRemove, isLoading="true", error}) {

    let  content;
    let  loading;

    if(isLoading) { loading = <Loading></Loading>; } else {

      if(error) { content = <p>{error.message}</p>; } else {

        if(processo) {
          content =
           <div className="wrapper Card">
              <div className="close" onClick={clickClose}>
                <FontAwesomeIcon icon="times" />
              </div>
              <section  className="Content">
                <div className="row">
                    <Hidden only={['xs','sm']}>
                      <div className="column-4 p-0">
                          <div className="Thumb Thumb-xl">{processo.thumb}</div>
                      </div>
                    </Hidden>
                  <div className="column-20 p-t-0 p-b-0">
                    <Label title="Processo" classTitle="Label-title-small" classValue="Label-text" className="column-12 p-0">{processo.numero}</Label>
                    <Label title="Data" classTitle="Label-title-small" classValue="Label-text" className="column-12 p-0">{processo.entrada}</Label>
                    <Label title="Assunto"  classTitle="Label-title-small" classValue="Label-text" className="column-24 p-0 p-t-10">{processo.assunto}</Label>
                  </div>
                </div>
                <div className="row p-0">
                  <Label title="Interessados" classTitle="Label-title-small" classValue="Label-text-small" className="column-24 ">
                {interessados}
                  </Label>
                </div>
                <div className="row p-0">
                  <Label title="Descrição" classTitle="Label-title-small"  classValue="Label-text-small" className="column-24 ">{processo.descricao}</Label>
                </div>
              </section>
              <section className="Footer">
                    <button onClick={clickRemove} className="btn-default m-r-15">Remover</button>
                    <button  className="btn-primary m-r-5">Editar</button>
              </section>
          </div>

        }
      }
    }

     return (
       <CssBaseline>
         {content}
         {loading}
       </CssBaseline>
      );




}

export default Processo;
