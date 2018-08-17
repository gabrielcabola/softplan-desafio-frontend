import React from 'react';
import Fade from '@material-ui/core/Fade';
import Grow from '@material-ui/core/Grow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Modal extends React.Component {

  constructor(props) {
     super(props);
     this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  // Adiciondo listeners após componentes estar montado.
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
  }

  // Removendo listener assim que for desmontado.
  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
  }

  // Ap pressionar ESC fechar modal
  handleKeyUp(e) {
    const { onClose } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
        onClose();
        window.removeEventListener('keyup', this.handleKeyUp, false);
      },
    };
    if (keys[e.keyCode]) { keys[e.keyCode](); }
  }



   // getProcesso = () => {
   //   this.setState({ isLoading: true });
   //   let id = (this.props.selected.id  || this.props.selectedId);
   //   console.log('------------->' + id);
   //   fetch(ApiProcesso + id,)
   //   .then(response => {
   //     if (response.ok) {
   //       this.setState({ isLoading: false });
   //       return response.json();
   //     } else {
   //       throw new Error('Houve um problema ao solicitar sua requisição ...');
   //     }
   //   })
   //   .then(data => this.setState({ selected: data, isLoading: false }))
   //   .catch(error => this.setState({ error, isLoading: false }));
   // }


  render() {
    const { children, title, onClose, show } = this.props;

     return (
      <Fade in={show}>
       <div className="modal-overlay-div">
        <div className="modal-content-div">
            <Grow in={show}>
              <div className="modal-dialog-div">

                <a className="close" onClick={onClose}>
                  <FontAwesomeIcon icon="times" />
                </a>
                <p className="Title Title--light Title--sm">{title}</p>
                {children}
              </div>
            </Grow>
        </div>
        </div>
      </Fade>

      );

  }
}

export default Modal;
