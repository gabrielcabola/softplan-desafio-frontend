import React, { Component } from 'react';
import { Route, Redirect , withRouter } from 'react-router-dom' // importando o BrowserRouter para criar as rotas e views internas
import CssBaseline from '@material-ui/core/CssBaseline';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        keyword: ''
    };
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Executa a mutação do estado da variavel
  handleKeywordChange(event) {
    this.setState({keyword: event.target.value.toLowerCase()});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.keyword !== '') {
      this.props.history.push('/result?key='+this.state.keyword);
    }

  }


  render() {

    return (
      <CssBaseline>
          <div className="Aligner">
            <div className="Aligner-item">
                <center>
                  <div className="m-0 p-0">
                      <h1 className="Title Light text-primary">Busca de processos</h1>
                  </div>
                  <div className="p-t-10">
                  <form  onSubmit={this.handleSubmit}>
                      <input
                      type="text"
                      value={this.state.keyword}
                      onChange={this.handleKeywordChange}
                      className="Input-search Input-search--block"
                      placeholder="Pesquise por uma informação do processo"/>
                  </form>
                  </div>
                  <div className="p-t-45">
                      <span className="Info-text text-medium text-light ">Você pode criar um novo processo <a className="text-primary">clicando aqui</a></span>
                  </div>
                </center>
            </div>
          </div>
      </CssBaseline>
    );
  }
}
export default App;
