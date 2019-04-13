import moment from 'moment';

export const formatTimeFromTimeStamp = (text) => moment.unix(text).format('YYYY-MM-DD');

export const formatOptionsFromMap = map => Object.entries(map).map(([number, text]) => ({ key: text, value: number }));