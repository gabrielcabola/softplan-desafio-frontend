import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { ApiProcesso }  from '../../config/constants'; //

class FormAdd extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
         assunto: "",
         interessado:"",
         interessados: [],
         descricao:"",
         isLoading: false,
         error: null,
         showAddModal: this.props.showAddModal,
     };
  }


   handleChange = name => event => {
     this.setState({
       [name]: event.target.value,
     });
   };


   handleAddInteressados = event => {
      if(this.state.interessado!=='') {
         this.state.interessados.push(this.state.interessado),
         this.setState({interessado: ""});
      }
   };

   handleSubmit = event => {
      event.preventDefault();
        this.setState({ isLoading: false, showAddModal: false });
      if (this.state.assunto !== '' &&
          this.state.interessados !== '' &&
          this.state.descricao !== ''
        )
        {
          this.setState({ isLoading: true });
          fetch(ApiProcesso,{
            headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
            method: 'POST',
            body:  JSON.stringify({
              assunto: this.state.assunto,
              descricao: this.state.descricao,
              interessados: this.state.interessados,
            })
          }).then(response => {
              if (response.ok) {
                this.setState({ isLoading: false, showAddModal: false });
                this.props.history.push('/');
                //return response.json();
              } else {
                throw new Error('Houve um problema ao solicitar sua requisição ...');
              }
            })
            .then(data => this.setState({ selected: data, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
        }
    }

  render() {


    const { children, selected, onClose, showAddModal } = this.props;

     return (
       <div className="FormAdd">
       <form className="container p-b-30" noValidate autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
       <Grid container spacing={24}>
            <Grid item xs={8}>
              <Grid item xs>
                  <TextField
                      id="assunto"
                      label="Assunto"
                      type="text"
                      value={this.state.assunto}
                      onChange={this.handleChange('assunto')}
                      className="textField"
                    />
              </Grid>
              <Grid item xs className="p-t-15">
                  <small className="Light text-medium">Interessados</small>
                  <div className="column-24">
                  {
                    this.state.interessados.map((interessado,index) => <div key={index} className="column-24 p-0 text-small">{interessado}</div>)
                  }
                  </div>
              </Grid>
              <Grid item xs>
                <TextField
                         id="interessados"
                         label="Interessados"
                         type="text"
                         value={this.state.interessado}
                         onChange={this.handleChange('interessado')}
                         className="TextField"
                       />
                         <a className="btn-default-inverse btn-small m-l-15" onClick={this.handleAddInteressados.bind(this)}>Adicionar</a>
              </Grid>
            </Grid>
            <Grid item xs={12}>
               <TextField
                        id="descricao"
                        label="Descrição"
                        value={this.state.descricao}
                        onChange={this.handleChange('descricao')}
                        className="textField"
                        multiline
                        rowsMax="4"
                      />
              </Grid>
            </Grid>
            <section className="Footer-form">
                  <button type="submit" className="btn-primary-inverse pull-right m-r-5">Salvar</button>
            </section>
       </form>
        </div>
      );

  }
}

export default FormAdd;
