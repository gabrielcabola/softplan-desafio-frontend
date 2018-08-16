import React, { Component } from 'react';
import queryString from 'query-string';
import CssBaseline from '@material-ui/core/CssBaseline';
import Loading from './components/Loading';
import { ApiProcesso }  from '../config/constants'; //

class Detail extends  React.Component {

  constructor(props) {
     super(props);
     this.state = {
         keyword: '',
         processos: [],
         isLoading: false,
         selected: {},
         selectedId: null,
         error: null,
         listInDetailMode: false,
     };
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
    const {  selected, isLoading, error } = this.props;
    let content;

    if(isLoading) { content = <Loading></Loading>; } else {
      if(error) { content = <p>{error.message}</p>; } else {
          content = <div>{selected.assunto} {selected.descricao} {selected.entrada} {selected.numero}<p>Processo detalhe</p></div>;
          }
    }


     return (
       <CssBaseline>
       <div className="wrapper">
       <div className="row">
         {content}
       </div>
       </div>
       </CssBaseline>
      );

  }
}

export default Detail;
