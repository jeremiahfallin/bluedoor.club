import moment from 'moment';

const formatDateWithoutTz = (date: string) => {
  return moment(date).format('YYYY-MM-DDTHH:mm:ss');
};

export default formatDateWithoutTz;
