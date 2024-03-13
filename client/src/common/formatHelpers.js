import { format, formatDistance } from 'date-fns';
import svLocale from 'date-fns/locale/sv';

export function toRelativeDateString(dateString) {
  const date = new Date(dateString);
  return formatDistance(date, new Date(), {
    addSuffix: true,
    locale: svLocale
  });
}

export function toDateTimeString(dateString) {
  const date = new Date(dateString);
  let string = '';
  string += format(date, 'eeee d MMMM yyyy', {
    locale: svLocale
  });
  string += ', klockan ';
  string += format(date, 'hh:mm:ss');
  return string;
}

export function truncate(str, maxLength) {
  return str.length > maxLength ? `${str.substring(0, maxLength)} ...` : str;
}