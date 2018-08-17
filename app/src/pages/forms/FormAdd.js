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

  /**
   * Gerencia mutações dos valores dos campos
   */
  handleChange = name => event => {
     const value = event.target.value;
     this.setState({[name]: value},
                 () => { this.validateField(name, value) });
  }

  /**
   * Add interesado
   */
   handleAddInteressados = event => {
      if(this.state.interessado!=='') {
         this.state.interessados.push(this.state.interessado);

         this.setState({interessado: "",interessadosValid: this.state.interessados.length});
      }
   }

   /**
    * Remove interesado
    */
   handleRemoveInteressados = name => {
     this.setState({
        interessados: this.state.interessados.filter(el => el !== name)
    })
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

                    <div className=" p-b-15 text-small text-primary">
                      <FormErrors formErrors={this.state.formErrors} />
                    </div>


                           <Grid container spacing={0}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="assunto"
                                        label="Assunto"
                                        type="text"
                                        value={this.state.assunto}
                                        onChange={this.handleChange('assunto')}
                                        className="textField"
                                      />
                                </Grid>
                            </Grid>

                           <Grid container spacing={0}>
                                <Grid item xs={12} sm={6} className="p-t-15">
                                    <small className="Light text-medium">Interessados</small>
                                    <Grid container>
                                    {
                                      this.state.interessados.map((interessado,index) => <Grid container key={index} className=" p-0 text-small">
                                                                                            <Grid item xs={8} sm={8}><span><FontAwesomeIcon className="Side-icon" onClick={() => this.handleRemoveInteressados(interessado)} color="#717171" icon="times-circle" /> {interessado}</span></Grid>
                                                                                        </Grid>)
                                    }
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container  direction="row" justify="flex-start" alignItems="flex-end">
                                  <Grid item xs={8} sm={6} >
                                        <TextField
                                                 id="interessados"
                                                 label="Interessados"
                                                 type="text"
                                                 value={this.state.interessado}
                                                 onChange={this.handleChange('interessado')}
                                                 className="textField"
                                               />
                                  </Grid>
                                  <Grid item xs={4} sm={6} className="p-b-10">
                                      <a className="btn-default-inverse btn-small m-l-10 " onClick={this.handleAddInteressados.bind(this)}>Adicionar</a>
                                  </Grid>
                          </Grid>

                         <Grid container spacing={0}>
                             <TextField
                                      id="descricao"
                                      label="Descrição"
                                      value={this.state.descricao}
                                      onChange={this.handleChange('descricao')}
                                      className="textField"
                                      multiline
                                      rows="4"
                                    />
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
