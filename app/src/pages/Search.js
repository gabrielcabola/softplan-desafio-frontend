import React, { Component } from 'react';
import queryString from 'query-string'
import CssBaseline from '@material-ui/core/CssBaseline';
import Fade from '@material-ui/core/Fade';
import List from './components/List';
import ListItem from './components/ListItem';
import SearchBar from './components/SearchBar';
import Loading from './components/Loading';
import Processo from './Processo';
import Modal from './components/Modal';
import FormAdd from './forms/FormAdd';

import { ApiSearch, ApiProcesso }  from '../config/constants'; //

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
        keyword: '',
        processos: [],
        isLoading: false,
        isLoadingDetail: false,
        selected: {},
        selectedId: null,
        error: null,
        errorDetail: null,
        listInDetailMode: false,
        showAddModal: false,
    };
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchList = this.fetchList.bind(this);
  }


  /**
   * Grava o status do novo valor no props
   */
  handleKeywordChange = (event)  => {
    this.setState({keyword: event.target.value.toLowerCase()});
  }

  //Abrir Add Modal
  handleToggleModal() {
    this.setState({ showAddModal: !this.state.showAddModal });
  }

  /**
   * Submit de uma nova busca
   */
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.keyword !== '') {
        //Reseta estado da busca
        this.cleanSelection();
        this.setState({processos: [], isLoading: true });
        //Redireciona para URL de resultado
        this.props.history.push('/result?key='+this.state.keyword);
        //Atualiza Lista
        this.fetchList();
    } //else print error on form
  }

  /**
   * Fecha Detalhe do processo
   */
  handlecloseDetail = ()  => {
    this.cleanSelection();
  }



  /**
   * Limpa Seleção
   */
  cleanSelection = () => {
    this.state.processos.map(function(item) {
      return item.selected = false;
    });
    this.setState({
      listInDetailMode: false,
      selected:[]
     });
  }


  /**
   * Click do Item
   */
  clickSelectProcess = (processo,index) => {

    this.cleanSelection();

    let newProcessos = Object.assign({}, this.state);
    newProcessos.processos[index].selected = true;

    //fetch API
    fetch(ApiProcesso + processo.id)
    .then(response => {
      if (response.ok) {
        this.setState({ isLoadingDetail: false });
        return response.json();
      } else {
        throw new Error('Houve um problema ao solicitar sua requisição ...');
      }
    })
    .then(data => this.setState({ selected: data, isLoadingDetail: false }))
    .catch(error => this.setState({ errorDetail: error, isLoadingDetail: false }));

    this.setState({
      processos:newProcessos.processos,
      listInDetailMode: true
     });

     //this.props.history.push('/processo/'+processo.id);
  }


  /**
   * API Busca
   */
  fetchList = (keyword) => {
    //Verifica se a keyword não esta vazia
    if(this.state.keyword==='' && keyword==='')  {
      this.setState({ isLoading: false });
      return;
    }
    let q = (this.state.keyword || keyword);
    this.setState({ keyword: q });

    //Resgata dados da API
    fetch(ApiSearch + q,{
      method: 'GET',
      headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/jsonapplication/json;charset=UTF-8'
              },
      mode: "cors"
    })
    .then(response => {
      if (response.ok) {
        this.setState({ isLoading: false });
        return response.json();
      } else {
        throw new Error('Houve um problema ao solicitar sua requisição ...');
      }
    })
    .then(data => this.setState({ processos: data, isLoading: false }))
    .catch(error => this.setState({ error, isLoading: false }));
}



  componentDidMount() {

     this.setState({ isLoading: true });

     //Resgata dados da query string
     const values = queryString.parse(this.props.location.search);
     let path = this.props.location.pathname;
     let paths =  path.split("/");
     if(paths[1]==='processo') {
         this.setState({selectedId: paths[2]});
     }
     if(paths[1]==='result') {
       if(values.key) {
          //caso tenha executa busca via URL
          this.fetchList(values.key);
       } else {
         //caso vazia envia para home
          this.props.history.push('/');
       }
     }
  }




  render() {
    const { keyword, selected, processos, isLoading, errorDetail, isLoadingDetail, listInDetailMode, error } = this.state;
    let content;
    let detalhe;


    //Loading Render
    if(isLoading) { content = <Loading></Loading>; } else {

      //Error Render
      if(error) { content = <p>{error.message}</p>; } else {

        if(selected) {
        //  detalhe = <Detail {...this.state}></Detail>
            detalhe = <Processo processo={selected} clickClose={this.handlecloseDetail.bind(this)} error={errorDetail} isLoading={isLoadingDetail}></Processo>;
        }

          //Sem Registros Render
          if(processos.length === 0)  { content = <h3 className="Sub-title text-primary p-50"><center>Nenhum registro encontrado</center></h3>; } else {

            //Lista Render
            content = <List name="Busca" keyword={keyword} listInDetailMode={listInDetailMode}>
                       {
                       processos.map((processo,index) =>
                       <ListItem
                          key={processo.id}
                          processo={processo}
                          compact={listInDetailMode}
                          onClick={this.clickSelectProcess.bind(this,processo,index)}
                       ></ListItem>
                     )}
                     <Fade in={selected}>
                        {detalhe}
                     </Fade>
                    </List>;
          }
      }
    }


     return (
        <CssBaseline>
        <div className="wrapper">
        <div className="row">
          <SearchBar
               title="Busca de Processos"
               keyword={keyword}
               onSubmit={this.handleSubmit}
               onChange={this.handleKeywordChange}
           ></SearchBar>
           <div className="row">

              {content}

            </div>
        </div>
        </div>
        </CssBaseline>
      );

  }
}

export default Search;
