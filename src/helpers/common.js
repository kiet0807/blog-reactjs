import moment from 'moment';

export const formatDateTime = (datetime) => {
  return moment(datetime).format('DD/MM/YYYY h:mm:ss A');
};
