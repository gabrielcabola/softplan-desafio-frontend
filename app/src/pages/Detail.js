import React, { Component } from 'react';
import queryString from 'query-string';
import CssBaseline from '@material-ui/core/CssBaseline';
import Loading from './components/Loading';
import Label from './components/Label';
import { ApiProcesso }  from '../config/constants'; //

class Detail extends React.Component {

  constructor(props) {
     super(props);
   this.setState({ keyword: 'Gabriel' });

  }


   getProcesso = () => {
     this.setState({ isLoading: true });
     let id = (this.props.selected.id  || this.props.selectedId);
     console.log('------------->' + id);
     fetch(ApiProcesso + id,)
     .then(response => {
       if (response.ok) {
         this.setState({ isLoading: false });
         return response.json();
       } else {
         throw new Error('Houve um problema ao solicitar sua requisição ...');
       }
     })
     .then(data => this.setState({ selected: data, isLoading: false }))
     .catch(error => this.setState({ error, isLoading: false }));
   }

  componentWillReceiveProps() {
    console.log('----------componentWillReceiveProps--->' );
    this.getProcesso();
  }

  componentDidMount() {
    console.log('-------componentDidMount------>');
    this.getProcesso();
  }

  render() {
    const { selected, isLoading, error, clickClose } = this.props;
    let  content;
    let  loading;


    if(isLoading) { loading = <Loading></Loading>; } else {
      if(error) { content = <p>{error.message}</p>; } else {
          content =
           <div className="wrapper Card">
           <div className="close" onClick={this.closeDetail}>X</div>
          <section  className="Content">
            <div className="row">
                <div className="column-4 p-0 hide-handhelds">
                    <div className="Thumb Thumb-xl">{selected.thumb}</div>
                </div>
              <div className="column-20 p-t-0 p-b-0">
                <Label title="Processo" classTitle="Label-title-small" classValue="Label-text" className="column-12 p-0">{selected.numero}</Label>
                <Label title="Data" classTitle="Label-title-small" classValue="Label-text" className="column-12 p-0">{selected.entrada}</Label>
                <Label title="Assunto"  classTitle="Label-title-small" classValue="Label-text" className="column-24 p-0 p-t-10">{selected.assunto}</Label>
              </div>
            </div>
            <div className="row p-0">
              <Label title="Interessados" classTitle="Label-title-small" classValue="Label-text-small" className="column-24 ">
              {
                selected.interessados.map((interessado,index) => <div key={index} className="column-12 p-0">{interessado}</div>)
              }
              </Label>
            </div>
            <div className="row p-0">
              <Label title="Descrição" classTitle="Label-title-small"  classValue="Label-text-small" className="column-24 ">{selected.descricao}</Label>
            </div>
          </section>
          <section className="Footer">
                <button className="btn-default m-r-15">Remover</button>
                <button className="btn-primary m-r-5">Editar</button>
          </section>
          </div>
          }
    }

     return (
       <CssBaseline>
         {content}
         {loading}
       </CssBaseline>

      );

  }
}

export default Detail;
