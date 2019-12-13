//import moment from 'moment' this would import this same file
const moment = require.requireActual('moment');

export default (timestamp = 0) => {
  return moment(timestamp);
};