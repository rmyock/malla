import React from 'react';
const {Component, PropTypes} = React;
import Radium from 'radium';

import BoxListContainer from '../../BoxListContainer/BoxListContainer.jsx';
import HelpPanel from '../../HelpPanel/HelpPanel.jsx';

import {snap} from '../../../utils.js';
import {
  CLICK_LENGTH_MS,
  COLORS,
  DIMENSIONS,
  GRID_SIZE,
  Z_INDEXES,
} from '../../../constants.js';

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    paddingTop: DIMENSIONS.LAYOUT.HEADER_HEIGHT,
  },
  main: {
    flex: '0 1 100%',
    position: 'relative', // to contain absolute descendants
    overflow: 'auto',
    backgroundImage: 'url(/images/grid-dot-gray_20x20.gif)',
    backgroundSize: '10px 10px',
    backgroundPosition: '1px 1px',
    cursor: 'crosshair',
    boxShadow: `inset 1px 1px ${COLORS.WHITE}`, // covers the first dots
  },
  betaFooter: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    padding: '7px 10px',
    backgroundColor: COLORS.GRAY_DARK,
    color: COLORS.WHITE,
    fontSize: 14,
    zIndex: Z_INDEXES.BETA_FOOTER,
  },
};

class Screen extends Component {
  constructor(props) {
    super(props);

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

    this.dragStartTime = null;
    this.isMoving = false;
    this.startX = 0;
    this.startY = 0;
    this.placeholderStyle = {
      display: 'none',
      border: '1px solid grey',
      width: 100,
      height: 100,
      position: 'fixed',
      top: 0,
      left: 0,
    };
  }

  onDragStart(e) {
    if (e.target !== e.currentTarget) return; // only work with clicks originating on the canvas

    this.props.boxActions.setActiveBox(null); // deselect all boxes

    this.isMoving = true;
    this.dragStartTime = performance.now();
    e.preventDefault();

    const mouseDims = e.touches ? e.touches[0] : e;
    this.startX = snap(mouseDims.pageX);
    this.startY = snap(mouseDims.pageY);

    const x = snap(mouseDims.pageX);
    const y = snap(mouseDims.pageY);

    this.placeholderEl.style.transform = `translate(${x}px, ${y}px)`;
    this.placeholderEl.style.width = '0px';
    this.placeholderEl.style.height = '0px';
    this.placeholderEl.style.display = 'block';

    window.addEventListener('mousemove', this.onDragMove, false);
    window.addEventListener('mouseup', this.onDragEnd, false);
    window.addEventListener('touchmove', this.onDragMove, false);
    window.addEventListener('touchend', this.onDragEnd, false);
  }

  onDragMove(e) {
    if (!this.isMoving) return;

    const mouseDims = e.touches ? e.touches[0] : e;

    this.placeholderEl.style.width = `${snap(mouseDims.pageX) - this.startX}px`;
    this.placeholderEl.style.height = `${snap(mouseDims.pageY) - this.startY}px`;
  }

  onDragEnd() {
    this.isMoving = false;

    const relativeDims = this.getRelativeDims(this.placeholderEl);

    const moreThanGridWidth = relativeDims.width >= GRID_SIZE;
    const moreThanGridHeight = relativeDims.height >= GRID_SIZE;
    const moreThanAClick = performance.now() - this.dragStartTime > CLICK_LENGTH_MS;

    if (moreThanAClick && (moreThanGridWidth || moreThanGridHeight)) {
      this.props.boxActions.add(relativeDims);
    }

    this.placeholderEl.style.display = 'none';

    window.removeEventListener('mousemove', this.onDragMove, false);
    window.removeEventListener('mouseup', this.onDragEnd, false);
    window.removeEventListener('touchmove', this.onDragMove, false);
    window.removeEventListener('touchend', this.onDragEnd, false);
  }

  getRelativeDims(el) {
    const childDims = el.getBoundingClientRect();
    const parentDims = el.parentElement.getBoundingClientRect();

    return {
      top: snap(childDims.top - parentDims.top),
      left: snap(childDims.left - parentDims.left),
      width: snap(childDims.width),
      height: snap(childDims.height),
    };
  }

  render() {
    return (
      <div style={styles.page}>
        <div
          style={styles.main}
          onMouseDown={this.onDragStart}
          onTouchStart={this.onDragStart}
        >
          <BoxListContainer />
  
          <div
            ref={el => this.placeholderEl = el}
            style={this.placeholderStyle}
          ></div>
        </div>

        <HelpPanel />

        <footer
          style={styles.betaFooter}
        >
          This is a beta release of Malla. It is not covered by any SLA or deprecation policy.
          It is not recommended for use in production applications.
        </footer>
      </div>
    );
  }
}

Screen.propTypes = {
  // state
  user: PropTypes.object.isRequired,

  // actions
  boxActions: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default Radium(Screen);
