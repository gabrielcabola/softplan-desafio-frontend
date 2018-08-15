import React, { Component } from 'react';
import {  Link } from 'react-router-dom' // importando o BrowserRouter para criar as rotas e views internas
import CssBaseline from '@material-ui/core/CssBaseline';


class Error404 extends Component {
  render() {
    return (
      <CssBaseline>
          <div className="Aligner">
            <div className="Aligner-item">
                <center>
                  <div className="m-0 p-0">
                      <h1 className="Title Light text-primary">Página não encontrada</h1>
                  </div>

                  <div className="p-t-45">

                      <Link className="text-dark" to="/">Voltar ao início</Link>

                  </div>
                </center>
            </div>
          </div>
      </CssBaseline>
    );
  }
}

export default Error404;
