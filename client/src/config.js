/* eslint-disable no-undef */
const productionUrl = window.location.origin;
const developmentUrl = 'http://localhost';
export const HOST = process.env.NODE_ENV === 'production' ? productionUrl : developmentUrl;
export const PORT = process.env.REACT_APP_PORT || process.env.PORT || 1234;
// export const HOST = process.env.HEROKU_APP_NAME || 'http://localhost';
