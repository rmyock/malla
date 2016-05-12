export const VENDORS = {
  GOOGLE_ANALYTICS_TRACKING_ID: 'UA-77392102-1',
};

export const ACTIONS = {
  UPSERT_BOX: 'UPSERT_BOX',
  SET_ACTIVE_BOX: 'SET_ACTIVE_BOX',
  DELETE_BOX: 'DELETE_BOX',
  UPDATE_BOX: 'UPDATE_BOX',
  CLEAR_BOXES: 'CLEAR_BOXES',
  UPSERT_PROJECT: 'UPSERT_PROJECT',
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  SIGN_IN_USER: 'SIGN_IN_USER',
  SIGN_OUT: 'SIGN_OUT',
  SET_INTERACTION: 'SET_INTERACTION',
};

export const INTERACTIONS = {
  SIGNING_IN_FROM_HOME_PAGE: 'SIGNING_IN_FROM_HOME_PAGE',
};

export const BOX_MODES = {
  SITTING: 'SITTING',
  MOVING: 'MOVING',
  TYPING: 'TYPING',
};

export const MODALS = {
  NONE: 'NONE',
  EXPORT_DATA: 'EXPORT_DATA',
  SOCIAL_SIGN_IN: 'SOCIAL_SIGN_IN',
};

export const GRID_SIZE = 10;

export const CLICK_LENGTH_MS = 150;

export const ANIMATION_DURATION = 150;

export const BREAKPOINT_SIZES = {
  // PHONES // iPhone, 6 Plus, Nexus 6
  TABLET_PORTRAIT: 480,
  TABLET_LANDSCAPE: 880,
  LAPTOP: 1120, // ultrabook, macbook air, pro 13 and 15
  DESKTOP: 1500, // iMac, most desktop monitors
};

export const SIGN_IN_STATUSES = {
  SIGNED_IN: 'SIGNED_IN',
  SIGNED_OUT: 'SIGNED_OUT',
};

export const BREAKPOINTS = {
  PHONE_ONLY: `@media (max-width: ${BREAKPOINT_SIZES.TABLET_PORTRAIT}px)`,
  TABLET_PORTRAIT: `@media (min-width: ${BREAKPOINT_SIZES.TABLET_PORTRAIT}px)`,
  TABLET_LANDSCAPE: `@media (min-width: ${BREAKPOINT_SIZES.TABLET_LANDSCAPE}px)`,
  LAPTOP: `@media (min-width: ${BREAKPOINT_SIZES.LAPTOP}px)`,
  DESKTOP: `@media (min-width: ${BREAKPOINT_SIZES.DESKTOP}px)`,
};

export const DIMENSIONS = {
  LAYOUT: {
    HEADER_HEIGHT: 48,
    HEADER_HEIGHT_HOME: 64,
    TOOLBAR_WIDTH: 120,
  },
  TEXT: {
    HEADING_1: 40,
    HEADING_2: 30,
    HEADING_3: 20, // TODO: no idea, just messing around
  },
};

// palette generated by: http://www.materialpalette.com/blue/deep-orange
export const COLORS = {
  PRIMARY_DARK: '#1976D2', // dark blue
  PRIMARY: '#2196F3', // blue
  PRIMARY_LIGHT: '#BBDEFB', // light blue
  ACCENT: '#FF5722', // orange
  GRAY_DARK: '#212121',
  GRAY: '#727272',
  GRAY_FADE: 'rgba(0, 0, 0, 0.618)',
  GRAY_LIGHT: '#B6B6B6',
  WHITE: '#FFFFFF',
};

export const FONT_FAMILIES = {
  SANS_SERIF: `'Open Sans', sans-serif`,
  SERIF: `'Roboto Slab', serif`
};

export const Z_INDEXES = {
  MOVING_BOX: 1,
  MODAL: 2,
};
