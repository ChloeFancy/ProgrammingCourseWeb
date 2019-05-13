import moment from 'moment';

export const formatTimeFromTimeStamp = (format = 'YYYY-MM-DD') => (text) => moment.unix(text).format(format);

export const formatOptionsFromMap = map => Object.entries(map).map(([number, text]) => ({ key: text, value: Number(number) }));

export const transformFromByteToM = byte => byte / 1024 / 1024;

export const debounce = (fn, delay) => {
  let timer = null;
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    const args = arguments;
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
