import React, { Component } from 'react';
import queryString from 'query-string'
import CssBaseline from '@material-ui/core/CssBaseline';
import List from './components/List';
import ListItem from './components/ListItem';
import SearchBar from './components/SearchBar';
import Loading from './components/Loading';
import Detail from './Detail';

import { ApiSearch }  from '../config/constants'; //

class Search extends Component {

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

  /**
   * Submit de uma nova busca
   */
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.keyword !== '') {
        //Reset Search states
        this.setState({processos: [], listInDetailMode: false, isLoading: true });
        this.props.history.push('/result?key='+this.state.keyword);
        this.fetchList();
    } //else print error on form
  }


  /**
   * Click do Item
   */
  clickSelectProcess = (processo,index) => {
     this.state.processos.map(function(item) {
       item.selected = false;
     });

    let newProcessos = Object.assign({}, this.state);
    newProcessos.processos[index].selected = true;
    this.setState({
      processos:newProcessos.processos,
      listInDetailMode: true,
      selected:processo
     });
     this.props.history.push('/processo/'+processo.id);
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
     if(paths[1]=='processo') {
         this.setState({selectedId: paths[2]});
     }
     if(paths[1]=='result') {
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
    const { keyword, selected, processos, isLoading, listInDetailMode, error } = this.state;
    let content;


    if(isLoading) { content = <Loading></Loading>; } else {
      if(error) { content = <p>{error.message}</p>; } else {
          if(processos.length === 0)  { content = <h3 className="Sub-title text-primary"><center>Nenhum registro encontrado</center></h3>; } else {

            content = <List name="Busca" listInDetailMode={listInDetailMode}>
                       {
                       processos.map((processo,index) =>
                       <ListItem
                          key={processo.id}
                          processo={processo}
                          compact={listInDetailMode}
                          onClick={this.clickSelectProcess.bind(this,processo,index)}
                       ></ListItem>
                     )}
                     <Detail {...this.state} />
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
          {content}
        </div>
        </div>
        </CssBaseline>
      );

  }
}

export default Search;
