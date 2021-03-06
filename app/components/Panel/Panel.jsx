import React from 'react';
const {PropTypes} = React;
import Radium from 'radium'; // media queries can be passed in styles

import Button from '../Button/Button.jsx';

import {
  COLORS,
  DIMENSIONS,
} from '../../constants.js';

import {
  css,
} from '../../utils';

const Panel = props => {
  const styles = {
    panelWrapper: { // So that the body height is correct. https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
      display: 'flex',
      flexFlow: 'column',
    },
    panel: {
      flex: '0 0 auto',
      display: 'flex',
      flexFlow: 'column',
      width: props.width,
      maxHeight: '94vh',
      maxWidth: '98vw',
      backgroundColor: COLORS.WHITE,
      ...css.shadow(),
      ...props.style,
    },
    header: {
      height: 64,
      flex: '0 0 auto',
      display: 'flex',
      flexFlow: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: COLORS.PRIMARY,
      color: COLORS.WHITE,
      boxShadow: `0 1px 3px ${COLORS.GRAY_LIGHT_FADE}`,
      zIndex: 1, // to put the shadow above the panel body
    },
    title: {
      fontSize: 22,
      paddingLeft: 20,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    close: {
      padding: 20,
      fontSize: 16,
    },
    body: {
      flex: '1 1 auto',
      padding: `${DIMENSIONS.SPACE_S}px ${DIMENSIONS.SPACE_S}px 0`,
      overflow: 'auto',
    },
    actions: {
      flex: '0 0 auto',
      padding: 20,
      textAlign: 'center',
    },
    okButton: {
      backgroundColor: COLORS.PRIMARY,
      color: COLORS.WHITE,
      padding: 12,
      minWidth: 100,
    },
  };

  const onOk = () => {
    props.onOk();
    props.hideModal(); // this may have already been called (e.g. in Feedback.jsx) but that's fine.
  };

  const actions = props.showOk
    ? (
    <div style={styles.actions}>
      <Button
        style={styles.okButton}
        onClick={onOk}
        disabled={props.okDisabled}
      >
        {props.okText}
      </Button>
    </div>
    ) : null;

  const closeButton = props.showClose
    ? (
    <Button
      style={styles.close}
      onClick={props.hideModal}
    >Close</Button>
    ) : null;

  return (
    <div style={styles.panelWrapper}>
      <div style={styles.panel}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            {props.title}
          </h1>

          {closeButton}
        </div>

        <div style={{...styles.body, ...props.panelBodyStyle}}>
          {props.children}
        </div>

        {actions}
      </div>
    </div>
  );
};

Panel.propTypes = {
  // props
  panelBodyStyle: PropTypes.object,
  title: PropTypes.string,
  showClose: PropTypes.bool,
  showOk: PropTypes.bool,
  okText: PropTypes.string,
  okDisabled: PropTypes.bool,
  width: PropTypes.number,
  onOk: PropTypes.func,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,

  // methods
  hideModal: PropTypes.func,
};

Panel.defaultProps = {
  title: '',
  showClose: true,
  showOk: true,
  okText: 'OK',
  okDisabled: false,
  width: 400,
  onOk: () => {},
};

export default Radium(Panel);
