import React, { Component } from 'react';
import Loading from './../components/Loading';
import TextField from '@material-ui/core/TextField';
import FormErrors from './FormErrors';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ApiProcesso }  from '../../config/constants';

class FormAdd extends Component {

  constructor(props) {
     super(props);
     this.state = {
         interessado:"",
         assunto: "",
         interessados: [],
         descricao:"",
         formErrors: {assunto: '', interessados: [], descricao:''},
         assuntoValid: false,
         interessadosValid: false,
         descricaoValid: false,
         formValid: false,
         isLoading: false,
         isSuccess: false,
         error: null,
         showAddModal: this.props.showAddModal,
     };
  }


  handleChange = name => event => {
     const value = event.target.value;
     this.setState({[name]: value},
                 () => { this.validateField(name, value) });
  }


   handleAddInteressados = event => {
      if(this.state.interessado!=='') {
         this.state.interessados.push(this.state.interessado);

         this.setState({interessado: "",interessadosValid: this.state.interessados.length});
      }
   }

   validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      let assuntoValid = this.state.assuntoValid;
      let interessadosValid = this.state.interessadosValid;
      let descricaoValid = this.state.descricaoValid;

      switch(fieldName) {
        case 'assunto':
          assuntoValid = value.length > 5;
          fieldValidationErrors.assunto = assuntoValid ? '' : ' é muito curto';
          break;
        case 'interessados':
          interessadosValid = this.state.interessados.length > 0;
          fieldValidationErrors.interessados = interessadosValid ? '' : ' é preciso ter pelo menos 1 interessado adicionado';
          break;
        case 'descricao':
          descricaoValid = value.length > 5;
          fieldValidationErrors.descricao = descricaoValid ? '': ' é muito curta';
          break;
        default:
          break;
      }
      this.setState({formErrors: fieldValidationErrors,
                      assuntoValid: assuntoValid,
                      interessadosValid: interessadosValid,
                      descricaoValid: descricaoValid
                    }, this.validateForm);
    }

    validateForm() {
      this.setState({formValid: this.state.assuntoValid && this.state.descricaoValid &&  this.state.interessadosValid});
    }

   handleSubmit = event => {
      event.preventDefault();

        this.setState({ isLoading: true });

              this.setState({ isLoading: true });
              fetch(ApiProcesso,{
                headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                  assunto: this.state.assunto,
                  descricao: this.state.descricao,
                  interessados: this.state.interessados,
                })
              }).then(response => {
                  if (response.ok) {
                    this.setState({ isLoading: false,  isSuccess: true });
                  } else {
                    throw new Error('Houve um problema ao solicitar sua requisição ...');
                  }
                })
                .catch(error => this.setState({ error, isLoading: false }));

    }

  render() {

    const {isLoading, error, isSuccess } = this.state;
    let content;


            //Loading Render
            if(isLoading) { content = <Loading></Loading>; } else {

              //After Success Submit
              if(isSuccess) { content = <div className="p-50"><div className="Sub-title text-primary text-center p-30">Processo Adicionado com Sucesso</div><hr/><div className="text-center p-30"><a className="btn-primary " onClick={() => this.props.onFinish()}>Continuar</a></div></div>  } else {

                //Error Render
                if(error) { content = <div className="Sub-title text-dark text-center p-30"><p>{error.message}</p></div>; } else {

                  content = <form className="container p-b-30" noValidate autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>

                    <div className="p-t-15 p-b-15 text-small text-primary">
                      <FormErrors formErrors={this.state.formErrors} />
                    </div>
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
                              <div className="column-24 p-0">
                              {
                                this.state.interessados.map((interessado,index) => <div key={index} className="column-24 p-0 text-small">{interessado}  <a className="Side-icon p-l-15"><FontAwesomeIcon icon="times-circle" /></a></div>)
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
                              <button type="submit" className="btn-primary-inverse pull-right m-r-5" disabled={!this.state.formValid}>Salvar</button>
                        </section>
                   </form>;
              }
            }
          }


          return (
               <div className="FormAdd">
                    {content}
                </div>
          );

        }//Render


}

export default FormAdd;
