import {connect} from 'react-redux';

import * as actions from '../../data/actionCreators.js';
import ModalWrapper from './ModalWrapper/ModalWrapper.jsx';

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  }
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: modal => {
      dispatch(actions.hideModal(modal));
    },
  };
};

const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(ModalWrapper);

export default ModalContainer;