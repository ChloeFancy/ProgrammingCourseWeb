import moment from 'moment';

export const formatTimeFromTimeStamp = (text) => moment.unix(text).format('YYYY-MM-DD');