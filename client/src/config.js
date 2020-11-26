/* eslint-disable no-undef */
const isDev = process.env.NODE_ENV !== 'production';
export const PORT = isDev ? process.env.REACT_APP_PORT || 8080 : 80;
const developmentUrl = `http://localhost`;
const productionUrl = window.location.origin;
export const HOST = isDev ? developmentUrl : productionUrl;
