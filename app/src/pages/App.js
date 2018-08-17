import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Modal from './components/Modal';
import FormAdd from './forms/FormAdd';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes,faSearch,faSpinner)

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        keyword: '',
        showAddModal: false,
    };
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Abrir Modal
  handleToggleModal() {
    this.setState({ showAddModal: !this.state.showAddModal });
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
    const {showAddModal} = this.state;
    return (
      <CssBaseline>
          <div className="Aligner">
            <div className="Aligner-item">
                <center>
                  <div className="m-0 p-0">
                      <h1 className="Title Light text-primary">Busca de processos</h1>
                  </div>
                  <div className="p-t-10">
                  <form onSubmit={this.handleSubmit}>
                    <div className="Form-group">
                     <input
                      type="text"
                      value={this.state.keyword}
                      onChange={this.handleKeywordChange}
                      className="Input-search Input-search--block"
                      placeholder="Pesquise por uma informação do processo"/>
                      <button className="SubmitIcon" type="submit"><FontAwesomeIcon icon="search" /></button>
                    </div>
                  </form>
                  </div>
                  <div className="p-t-45">
                      <span className="Info-text text-medium text-light ">Você pode criar um novo processo <a className="text-primary Link" onClick={() => this.handleToggleModal()}><strong>clicando aqui</strong></a></span>
                  </div>
                </center>
            </div>
          </div>

          {showAddModal &&
          <Modal title="Cadastro de processo" show={showAddModal} onClose={() => this.handleToggleModal()}>
            <FormAdd showAddModal={showAddModal}> </FormAdd>
          </Modal>}

      </CssBaseline>
    );
  }
}
export default App;
