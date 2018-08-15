import React, { Component } from 'react';
import queryString from 'query-string'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApiSearch, ApiProcesso }  from '../config/constants';

class SearchList extends Component {

  constructor(props) {
    super(props);
    this.state = {
        keyword: '',
        processos: {},
        isLoading: false,
        error: null,
    };
  }

  handleKeywordChange(event) {
    this.setState({keyword: event.target.value.toLowerCase()});
  }

  componentDidMount() {
     this.setState({ isLoading: true });
     const values = queryString.parse(this.props.location.search);
     console.log(values.key);
     if(values.key) {

       this.setState({keyword:values.key});

       fetch(ApiSearch + values.key,{
         method: 'GET',
         headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/jsonapplication/json;charset=UTF-8',
                 'Access-Control-Allow-Origin': 'http://localhost:3002'
                },
         mode: "cors"
       })
       .then(response => {
         console.log(response);
         if (response.ok) {
           return response.json();
         } else {
           throw new Error('Houve um problema ao solicitar sua requisição ...');
         }
       })
       .then(data => this.setState({ processos: data, isLoading: false }))
       .catch(error => this.setState({ error, isLoading: false }));
     } else {
         this.props.history.push('/');
     }
  }


  render() {

    const { processos, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    processos.map(processo => console.log(processo) );

    if (isLoading) {
     return (
        <CssBaseline>
           <div className="Aligner">
             <div className="Aligner-item">
                 <center>
                 <p>Loading ...</p>
                 </center>
              </div>
            </div>
        </CssBaseline>
      )
    }
    return (
      <span>ko</span>
    );

    // return (
    //   <ul>
    //     {this.props.state.processos.map(processo =>
    //       <li key={processo.id}>
    //         <a href={processo.id}>{processo.numero}</a>
    //       </li>
    //     )}
    //   </ul>
    // );


  }
}

export default SearchList;
